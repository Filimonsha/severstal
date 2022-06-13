import React, { useContext, useState } from 'react'
import { Alert, Button, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swiper from 'swiper'
import { AuthCtx } from '../../context/authContext'
import axiosInstance from '../../helpers/axios'
import { ITest } from '../../types/interfaces'
import "./ControlPanel.css"
interface IProps {
    listOfDetails: {}[],
    swiper: Swiper | null,
    setUserClickedAnalysis: React.Dispatch<React.SetStateAction<boolean>>,
    currentTestId: string,
    currentInfoAboutTest: ITest,
    setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,
    setSideOfLighting: React.Dispatch<React.SetStateAction<boolean>>
}
const ControlPanel = (props: IProps) => {
    const [analysed, setAnalysed] = useState(false)
    const [lightingActive, setLightingActive] = useState(false)
    console.log(props.swiper)
    const nav = useNavigate()
    // const {currentTestId, setCurrentTestId} = useContext(AuthCtx)
    const handleAnalyse = () => {
        setAnalysed(true)

        const currentDate = new Date()
        const formatedCurrentDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate()
        console.log(formatedCurrentDate)
        axiosInstance.put(`api/imaging/test/${props.currentTestId}/`, {
            date: formatedCurrentDate
        }).then(res => {
            props.setCurrentInfoAboutTest((prevInfo: any) => ({ ...prevInfo, date: formatedCurrentDate }))
            console.log(props.currentInfoAboutTest)
            console.log("Была нажата анализировано", analysed)
        }).catch(er => console.log(er))
        console.log([props.currentTestId], "Текущий айди теста")
        props.setUserClickedAnalysis(true)
    }
    return (
        <div className="control-panel">
            <h2 className='text-start mb-4'>
                Характеристики
            </h2>
            <div className='mb-4'>
                <div className="control-panel__lighting d-flex align-items-center justify-content-between">
                    <span className="control-panel__label">
                        Освещение
                    </span>
                    <label className="custom-control material-switch" style={{ opacity: props.listOfDetails.length === 0 ? 0.5 : 1 }}>
                        <input type="checkbox" className="material-switch-control-input" disabled={props.listOfDetails.length === 0} onChange={(event) =>
                            {props.setSideOfLighting((prevState) => !prevState)
                            }
                        } />
                        <span className="material-switch-control-indicator">
                        </span>
                    </label>
                </div>
            </div>
            {
                props.listOfDetails.length !== 0 &&
                (<div className="choosing-part mb-4">
                    <p className='text-start mb-2'>
                        Часть
                    </p>
                    <div className="choosing-part__control d-flex align-items-start mb-2">
                        <input id="choosing-part__input" className='w-25 me-2' type="number" onChange={(event) => {
                            console.log(Number(event.target.value as unknown as number) - 1)
                            props.swiper?.slideTo(Number(event.target.value as unknown as number) - 1, 0)

                        }} />
                        <label htmlFor="choosing-part__input">
                            из {props.listOfDetails.length}
                        </label>
                    </div>
                </div>
                )
            }

            <div className='mb-2 w-75'>
                <p className='text-start mb-2'>
                    Статус
                </p>
                {
                    props.currentInfoAboutTest?.date ?
                        <Alert variant='primary'>
                            Анализировано {props.currentInfoAboutTest?.date}
                        </Alert> :
                        <Alert variant='danger' className=''>
                            Не анализировано
                        </Alert>
                }
            </div>
            <div>
                {props.currentInfoAboutTest?.date ?
                    <Button variant="outline-primary" onClick={() => props.setUserClickedAnalysis(true)} disabled={props.listOfDetails.length === 0} className='w-100'>Просмотреть анализ</Button>
                    : <Button variant="outline-primary" onClick={handleAnalyse} disabled={props.listOfDetails.length === 0} className='w-100'>АНАЛИЗИРОВАТЬ</Button>

                }
            </div>

        </div>
    )
}

export default ControlPanel