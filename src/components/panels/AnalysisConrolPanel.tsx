import React from 'react'
import { Accordion, Button, Container, Row } from 'react-bootstrap'
import Swiper from 'swiper'
import "./AnalysisControlPanel.css"
interface IProps {
  listOfDetails: {}[],
  swiper: Swiper | null,
}
const AnalysisConrolPanel = (props: IProps) => {
  return (
    <div className="analysis-control-panel d-flex align-items-center">

      <h2 className='text-start mb-4'>
        Информация о заготовке
      </h2>
      <div className='mb-4'>
        Вид / профиль продукции:
      </div>
      <div>
        Номер плавки/ручья:
      </div>
      <div>
        Сечение, мм:
      </div>
      <div>

      </div>
      <div className='analysis-control-panel__statistics'>
        <h4>
          Статистика
        </h4>
        <Accordion>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              ОР, 0.5 Б
            </Accordion.Header>
            <Accordion.Body>
              Измерения, ММ.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              ОР, 0.5 Б
            </Accordion.Header>
            <Accordion.Body>
              Измерения, ММ.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="choosing-part">
        <span>
          Часть
        </span>
        <div className="choosing-part__control">
          <input id="choosing-part__input" type="number" onChange={(event) => {
            console.log(Number(event.target.value as unknown as number) - 1)
            props.swiper?.slideTo(Number(event.target.value as unknown as number) - 1, 0)

          }} />
          <label htmlFor="choosing-part__input">
            "из" {props.listOfDetails.length}
          </label>
        </div>
      </div>
      <span className='text-start mb-2'>
        Статус
      </span>

      <div className='d-flex justify-content-center justify-content-between mb-3'>
        <Button variant="outline-primary " className='analysis-control-panel__save'>Сохранить отчет</Button>
        <Button className="d-flex align-items-center analysis-control-panel__back" variant="primary">
          Назад
        </Button>
      </div>
      <Button variant="outline-primary " className='analysis-control-panel__shape m-0'>Просмотреть полное сечение</Button>
    </div>
  )
}

export default AnalysisConrolPanel