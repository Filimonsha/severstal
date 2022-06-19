// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
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
  useEffect(() => {
    // countRanges()
    axiosInstance.get("/api/choices/product_type/").then(res => setTypeOfProductsList(res.data))
    axiosInstance.get(`/api/imaging/test/${props.currentInfoAboutTest.id}/`).then(res => {
      setCurrentTest(res.data)
      setRanges(res.data.ranges)
    })
  }, [])
  const handleUpdateComment = (value: string) => {
    axiosInstance.put(`api/imaging/test/${props.currentInfoAboutTest.id}/`, {
      comment: value
    }).then(res => {
      console.log("Комм обновлен", res.data)
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
        Сечение, мм: {props.currentInfoAboutTest.segments[currentSegment]?.width} {props.currentInfoAboutTest.segments[currentSegment] && "x"}{props.currentInfoAboutTest.segments[currentSegment]?.length}
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
            if (e.target.value.trim() === "") {
              setValueOfSliderPart(e.target.value)
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
      <div className='analysis-control-panel__statistics mb-4'>
        <h4 className='text-start'>
          Статистика
        </h4>
        <Accordion>
          {currentTest &&
            Object.keys(currentTest?.score).map((el, index) => {
              return (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    {Object.keys(currentTest?.score)[index]},
                    {
                      currentTest?.score[el] + " "
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
                      ranges &&
                      ranges[el].map(el => {
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
                    {/* <Col className='d-flex flex-column border-end'>
                      <span>
                        Измерения
                      </span>
                      {
                      }
                    </Col>
                    <Col >
                      <span>
                        Измерения
                      </span>

                    </Col> */}
                    {/* </Row> */}

                  </Accordion.Body>
                </Accordion.Item>
              )
            })
          }
        </Accordion>
      </div>


      <div className='d-flex justify-content-center justify-content-between mb-3'>
        <Button variant="outline-primary " className='analysis-control-panel__save'>Сохранить отчет</Button>
        {
          !props.isHistoryRoute &&
          <Button className="d-flex align-items-center analysis-control-panel__back" variant="primary" onClick={() => props.setUserClickedAnalysis(false)}>
            Назад
          </Button>
        }

      </div>
      <Button variant="outline-primary " className='analysis-control-panel__shape mb-5' onClick={() => setShowModal(true)}>Просмотреть полное сечение</Button>




      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      // className="analysis-control-panel__modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Полное сечение</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {
            currentTest?.segments.map(segment => {
              return (
                <Row className="mb-3">
                  {segment.images.map(img => {
                    if (img.light === "top") {
                      if (showProcessedPhoto) {
                        console.log("Показываем фото обработанные", img.file_res_crop)
                        return (
                          <Col md={'4'}>
                            <img src={`${img.file_res_crop}`} alt="" className="me-3"
                            />
                          </Col>
                        )
                      } else {
                        console.log("Показываем фото необработанные", img.file_crop)
                        return (
                          <Col md={'4'}>
                            <img src={`${img.file_crop}`} alt="" className="me-3"
                            />
                          </Col>
                        )
                      }

                    }

                  })}
                </Row>
              )
            })
          }

        </Modal.Body>
        <Modal.Footer>
          <div className="control-panel__lighting d-flex align-items-center justify-content-between">
            <span className="control-panel__label">
              Показать анализированные изображения
            </span>
            <label className="custom-control material-switch" >
              <input type="checkbox" className="material-switch-control-input" onChange={(event) => {
                setShowProcessedPhoto(prevValue => !prevValue)
                console.log(showProcessedPhoto)
              }
              } />
              <span className="material-switch-control-indicator">
              </span>
            </label>
          </div>
          <Button
            variant="outline-primary"
            onClick={() => setShowModal(false)}
          >
            Назад
          </Button>

        </Modal.Footer>
      </Modal>

    </div >
  )
}

export default AnalysisConrolPanel