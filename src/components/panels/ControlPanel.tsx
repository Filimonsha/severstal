import React, { useState } from 'react'
import { Alert, Button, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swiper from 'swiper'
import "./ControlPanel.css"
interface IProps {
    listOfDetails: {}[],
    swiper: Swiper | null,
}
const ControlPanel = (props: IProps) => {
    const [analysed, setAnalysed] = useState(false)
    const [lightingActive, setLightingActive] = useState(false)
    console.log(props.swiper)
    const nav = useNavigate()
    const handleAnalyse = () => {
        nav(
            "/analysis"
        )
    }
    return (
        <div className="control-panel">
            <h2 className='text-start mb-4'>
                Характеристики
            </h2>
            <Row className='mb-4'>
                <div className="control-panel__lighting d-flex justify-content-between">
                    <span className="control-panel__label">
                        Освещение
                    </span>
                    <label className="custom-control material-switch">
                        <input type="checkbox" className="material-switch-control-input" onChange={(event) =>
                            setLightingActive((prevState) => !prevState)
                        } />
                        <span className="material-switch-control-indicator">
                        </span>
                    </label>
                </div>
            </Row>
            <Row className="choosing-part">
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
            </Row>
            <Row className='mb-4'>
                <span className='text-start mb-2'>
                    Статус
                </span>
                {
                    analysed ?
                        <Alert>

                        </Alert> :
                        <Alert variant='danger'>
                            Не анализировано
                        </Alert>
                }
            </Row>
            <Row>
                <Button variant="outline-primary" onClick={handleAnalyse} className=''>АНАЛИЗИРОВАТЬ</Button>
            </Row>

        </div>
    )
}

export default ControlPanel