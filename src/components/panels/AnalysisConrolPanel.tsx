// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, Alert, Button, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap'
import Swiper from 'swiper'
import axiosInstance from '../../helpers/axios'
import { IRanges, ISegment, ITest, ITypeOfPropduct } from '../../types/interfaces'
import "./AnalysisControlPanel.css"
interface IProps {
  swiper: Swiper | null,
  setUserClickedAnalysis?: React.Dispatch<React.SetStateAction<boolean>>,
  currentInfoAboutTest: ITest,
  setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,
  isHistoryRoute: boolean
}


const AnalysisConrolPanel = (props: IProps) => {
  const [currentSegment, setCurrentSegment] = useState(1)
  const [currentTest, setCurrentTest] = useState<ITest>()
  const [typeOfProductsList, setTypeOfProductsList] = useState<Array<ITypeOfPropduct>>([])
  const [currentComment, setCurrentComment] = useState(props.currentInfoAboutTest.comment)
  const [ranges, setRanges] = useState<IRanges>()
  const [showModal, setShowModal] = useState(false)
  const [showProcessedPhoto, setShowProcessedPhoto] = useState(false)
  const [valueOfSliderPart, setValueOfSliderPart] = useState("")
  const [srcClickedImg, setSrcClickedImg] = useState("")
  const [showModalClickedImg, setShowModalClickedImg] = useState(false)
  const [showSaveReport, setShowSaveReport] = useState(false)
  useEffect(() => {
    // countRanges()
    setRanges(props.currentInfoAboutTest.ranges)

    axiosInstance.get("/api/choices/product_type/").then(res => setTypeOfProductsList(res.data))
    axiosInstance.get(`/api/imaging/test/${props.currentInfoAboutTest.id}/`).then(res => {
      console.log("Абобааааа", res.data)
      setCurrentTest(res.data)
      console.log("ойх", currentTest)

    })
  }, [])

  useEffect(() => {
    setCurrentTest(props.currentInfoAboutTest)
  }, [props.currentInfoAboutTest])
  useEffect(() => {
    // let fAllImageAnalysed
    // props.currentInfoAboutTest.segments.forEach((segment, sIndex) => {
    //   segment.images.forEach((image, iIndex) => {
    //     if (!image.needToAnylyse) {
    //       // fAllImageAnalysed=true
    //       setImagesAnalysed(true)

    //     }
    //   })
    // })

  }, [])
  const handleUpdateComment = (value: string) => {
    axiosInstance.put(`/api/imaging/test/${props.currentInfoAboutTest.id}/`, {
      comment: value
    }).then(res => {
      props.setCurrentInfoAboutTest((prevInfo) => ({
        ...prevInfo,
        comment: value,
      }))
    })
  }


  return (
    <div className="analysis-control-panel d-flex align-items-start ">

      <h2 className='text-start mb-4'>
        Информация о заготовке
      </h2>
      <span className='mb-2'>
        Вид / профиль продукции: {typeOfProductsList.length !== 0 &&
          typeOfProductsList.map(el => {
            if (el.id === props.currentInfoAboutTest.product_type) {
              return el.name
            }
          })
        }
      </span>
      <span className='mb-2'>
        Номер плавки/ручья: {props.currentInfoAboutTest.melting_number}
      </span>
      <span className='mb-2'>
        Сечение, мм: {props.currentInfoAboutTest.segments[currentSegment]?.width} {props.currentInfoAboutTest.segments[currentSegment] && "x "}{props.currentInfoAboutTest.segments[currentSegment]?.length}
      </span>
      <Form.Text>Комментарий</Form.Text>
      <Form.Control
        as={"textarea"}
        placeholder="Комментарий, если необходимо"
        className="mb-3 analysis-control-panel__comment"
        value={currentComment}
        onChange={(e) => {
          handleUpdateComment(e.target.value)
          setCurrentComment(e.target.value)
        }}
      />
      <div className="choosing-part mb-4">
        <p className='text-start mb-2'>
          Деталь
        </p>
        <div className="choosing-part__control d-flex align-items-start mb-2">
          <input id="choosing-part__input" className='w-25 me-2' type="number" defaultValue={props.currentInfoAboutTest.segments.length} value={valueOfSliderPart} placeholder="1" onChange={(event) => {
            if (event.target.value.trim() === "") {
              setValueOfSliderPart(event.target.value)
            }
            if (Number(event.target.value) > 0 && Number(event.target.value) <= props.currentInfoAboutTest.segments.length) {
              setValueOfSliderPart(event.target.value)
              setCurrentSegment(Number(event.target.value as unknown as number) - 1)
              props.swiper.slideTo(Number(event.target.value as unknown as number) - 1, 0)
            }


          }} />
          <label htmlFor="choosing-part__input">
            из {props.currentInfoAboutTest.segments.length}
          </label>
        </div>
      </div>
      <div className='analysis-control-panel__statistics mb-4 w-100'>
        <h4 className='text-start'>
          Статистика
        </h4>
        {/* {
          !props.currentInfoAboutTest.stillAnalysing ? */}
        <Accordion className='w-100'>
          {props.currentInfoAboutTest && props.currentInfoAboutTest.score &&
            Object.keys(props.currentInfoAboutTest.score).map((el, index) => {
              return (
                <Accordion.Item eventKey={index} className="w-100">
                  <Accordion.Header>
                    {Object.keys(props.currentInfoAboutTest?.score)[index]},
                    {
                      props.currentInfoAboutTest?.score[el] + " "
                    }
                    Б
                  </Accordion.Header>
                  <Accordion.Body>
                    {/* <Row> */}
                    <Row>
                      <Col className='border-end border-dark p-0'>
                        <span>
                          Измерения, ММ.
                        </span>
                      </Col>
                      <Col className='p-0'>
                        <span>
                          Найдено, шт.
                        </span>
                      </Col>
                    </Row>
                    {
                      props.currentInfoAboutTest.ranges &&
                      props.currentInfoAboutTest.ranges[el].map(el => {
                        return (
                          <Row>
                            <Col className='border-end border-dark p-0'>
                              {
                                (!el.bottom) &&
                                <span>
                                  {"< " + el.top}
                                </span>
                              }
                              {
                                !el.top &&
                                <span>
                                  {el.bottom + " >"}
                                </span>
                              }
                              {
                                el.top && el.bottom &&
                                <span>
                                  {el.bottom + " - " + el.top}
                                </span>
                              }
                            </Col>
                            <Col className='p-0'>
                              <span>
                                {el.amount}
                              </span>
                            </Col>
                          </Row>
                        )
                      })
                    }
                  </Accordion.Body>
                </Accordion.Item>
              )
            })
          }
        </Accordion>
        {/* :
            <Spinner animation='border' className="analysis-control-panel__spinner" />
        } */}

      </div>


      <div className='d-flex w-100 justify-content-center justify-content-between mb-3'>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            setShowSaveReport(true)
          }}
        >
          Сохранить отчет
        </Button>        {
          !props.isHistoryRoute &&
          <Button className="d-flex align-items-center analysis-control-panel__back" variant="primary" onClick={() => props.setUserClickedAnalysis(false)}>
            Назад
          </Button>
        }

      </div>
      <Button variant="outline-primary " className='analysis-control-panel__shape mb-5' onClick={() => setShowModal(true)}>Просмотреть полное сечение</Button>




      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false)
          setShowProcessedPhoto(false)
        }}

      // className="analysis-control-panel__modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Полное сечение</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>


            {
              currentTest?.segments.map(segment => {
                return (
                  // <Row className="mb-3 justify-content-center">
                  <>
                    {segment.images.map(img => {
                      // if (img.light === "top") {
                      if (showProcessedPhoto) {
                        return (
                          <Col md={'2'} className="mb-3">
                            <img src={`${img.file_res_crop}`} alt="" className="w-100 h-100 me-3"
                              onClick={() => {
                                setSrcClickedImg(img.file_res_full)
                                setShowModalClickedImg(true)
                              }}
                            />
                          </Col>
                        )
                      } else {
                        return (
                          <Col md={'2'} className="mb-3">
                            <img src={`${img.file_top_crop}`} alt="" className="w-100 h-100 me-3"
                              onClick={() => {
                                setSrcClickedImg(img.file_top_full)
                                setShowModalClickedImg(true)
                              }}
                            />
                          </Col>
                        )
                      }

                      // }

                    })}
                  </>
                  // </Row>
                )
              })
            }
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div className="control-panel__lighting d-flex align-items-center justify-content-between">
            <span className="control-panel__label">
              Показать анализированные изображения
            </span>
            <label className="custom-control material-switch" >
              <input type="checkbox" className="material-switch-control-input" onChange={(event) => {
                setShowProcessedPhoto(prevValue => !prevValue)
              }
              } />
              <span className="material-switch-control-indicator">
              </span>
            </label>
          </div>
          <Button
            variant="outline-primary"
            onClick={() => {
              setShowModal(false)
              setShowProcessedPhoto(false)
            }}
          >
            Назад
          </Button>

        </Modal.Footer>
      </Modal >
      <Modal
        // size="lg"
        show={showModalClickedImg}
        onHide={() => { setShowModalClickedImg(false) }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <img src={srcClickedImg} alt="" className="w-50 h-50 me-3" />

        </Modal.Body>
      </Modal>
      <Modal
        size="sm"
        show={showSaveReport}
        onHide={() => { setShowSaveReport(false) }}
        className="save-report-modal"
      >
        <Modal.Header closeButton className='pb-0'>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column justify-content-center">
          <Col className=''>
            <Alert variant='secondary'>
              Сохранить отчет с изображениями ?
            </Alert>
            <Row className="d-flex justify-content-between me-0 m-0">

            <a download href={`http://${process.env.REACT_APP_SERVER_SEVERSTAL}/api/imaging/test/${props.currentInfoAboutTest.id}/download_report/?with_pictures=1`} className='analysis-control-panel__save btn btn-outline-primary me-2'>Да</a>

            <a download href={`http://${process.env.REACT_APP_SERVER_SEVERSTAL}/api/imaging/test/${props.currentInfoAboutTest.id}/download_report/`} className='analysis-control-panel__save btn btn-outline-primary me-2'>Нет</a>

            </Row>
          </Col>

        </Modal.Body>
      </Modal>
    </div >
  )
}

export default AnalysisConrolPanel