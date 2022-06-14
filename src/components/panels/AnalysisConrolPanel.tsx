// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import Swiper from 'swiper'
import axiosInstance from '../../helpers/axios'
import { ISegment, ITest, ITypeOfPropduct } from '../../types/interfaces'
import "./AnalysisControlPanel.css"
interface IProps {
  swiper: Swiper | null,
  setUserClickedAnalysis?: React.Dispatch<React.SetStateAction<boolean>>,
  currentInfoAboutTest: ITest,
  setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,
  isHistoryRoute: boolean
}

interface IGeneralRanges {
  name: string,
  ranges: [
    {
      top: number | null,
      bottom: number | null,
      count: number
    }
  ] | []
}

const AnalysisConrolPanel = (props: IProps) => {
  const [currentSegment, setCurrentSegment] = useState(1)
  const [currentTest, setCurrentTest] = useState<ITest>()
  const [typeOfProductsList, setTypeOfProductsList] = useState<Array<ITypeOfPropduct>>([])
  const [currentComment, setCurrentComment] = useState(props.currentInfoAboutTest.comment)
  const [defectsRangesOP, setDefectRangesOP] = useState<IGeneralRanges>(
    {
      name: "ОР",
      ranges: []
    },
  )
  const [showModal, setShowModal] = useState(false)
  const [showProcessedPhoto, setShowProcessedPhoto] = useState(false)
  useEffect(() => {
    // countRanges()
    axiosInstance.get("/api/choices/product_type/").then(res => setTypeOfProductsList(res.data))
    axiosInstance.get(`/api/imaging/test/${props.currentInfoAboutTest.id}/`).then(res => setCurrentTest(res.data))
  }, [])

  // const countRanges = () => {
  //   console.log("ааааааа",currentTest)
  //   currentTest.segments.map(segment => {
  //     segment.images.map(image => {
  //       image.defects.map(currentDefect => {
  //         console.log("CurrentDefect",currentDefect)
  //         currentDefect.ranges.map(range => {

  //           // ОР        
  //           console.log("Range", range)
  //           const prevRangesOP = defectsRangesOP.ranges
  //           defectsRangesOP.ranges.forEach((defectRange, index) => {
  //             console.log("DefectRange", defectRange)
  //             if (range.bottom === defectRange?.bottom && range.top === defectRange?.top) {
  //               console.log("Ебать они совпали")
  //               prevRangesOP[index].count = prevRangesOP[index].count + range.amount
  //               setDefectRangesOP(prevDefectRangesOP => ({ ...prevDefectRangesOP, ranges: prevRangesOP }))
  //             } else {
  //               console.log("Они не совпали")
  //               prevRangesOP.push({ top: range.top, bottom: range.bottom, count: range.amount })

  //               setDefectRangesOP(prevDefectRangesOP => ({ ...prevDefectRangesOP, ranges: prevRangesOP }))
  //             }
  //           })
  //         })
  //       })
  //     })
  //   })
  // }
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
        Сечение, мм: {props.currentInfoAboutTest.segments[currentSegment]?.width}x{props.currentInfoAboutTest.segments[currentSegment]?.length}
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
          <input id="choosing-part__input" className='w-25 me-2' type="number" onChange={(event) => {
            setCurrentSegment(Number(event.target.value as unknown as number) - 1)
            props.swiper?.slideTo(Number(event.target.value as unknown as number) - 1, 0)

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
          {/* {currentTest?.score.map(el=>{
            return (
              <Accordion.Item>
                <Accordion.Header>
                  {el.name},{el.score}
                </Accordion.Header>
                <Accordion.Body>
            
                </Accordion.Body>
              </Accordion.Item>
            )
          })} */}
        </Accordion>
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              ОР, {props.currentInfoAboutTest.score.ОР}
            </Accordion.Header>
            <Accordion.Body>
              ff
              {/* {
                defectsRangesOP.ranges.map(range => {
                  return (
                    <div>
                      {range.bottom} - {range.top}, количество {range.count}
                    </div>
                  )
                })
              } */}
              Измерения, ММ.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              ОР, 0.5 Б {props.currentInfoAboutTest.score.ОХН}
            </Accordion.Header>
            <Accordion.Body>
              Измерения, ММ.
            </Accordion.Body>
          </Accordion.Item>
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
      <Button variant="outline-primary " className='analysis-control-panel__shape m-0' onClick={() => setShowModal(true)}>Просмотреть полное сечение</Button>




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
                <Row>
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
              Освещение
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

    </div >
  )
}

export default AnalysisConrolPanel