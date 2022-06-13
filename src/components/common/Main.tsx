import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { AuthCtx } from '../../context/authContext'
import { sessionId } from '../../helpers/api'
import { ISegment, ITest } from '../../types/interfaces'
import Auth from '../auth/Auth'
import Analysis from '../details/analysis/Analysis'
import ListOfDetails from '../details/ListOfDetails'
import ControlPanel from '../panels/ControlPanel'
import "./Main.css"

const Main = () => {
    const [swiper, setSwiper] = useState(null)

    const [listOfDetails, setListOfDetails] = useState<Array<ISegment>>([])
    const [userClickedAnalysis, setUserClickedAnalysis] = useState(false)
    const [currentTestId,setCurrentTestId] = useState("")
    const [sideOfLighting,setSideOfLighting] = useState(false)
    const nav = useNavigate()
    
    const [currentInfoAboutTest,setCurrentInfoAboutTest] = useState<ITest|any>(null)


    useEffect(() => {
        console.log("Йоу", sessionId)
        console.log(document.cookie)
        // if (getCookie("sessionid") === undefined) {
        //     nav("/auth")
        // }
    }, [])

    return (

        <AuthCtx.Provider value={{currentTestId, setCurrentTestId}}>

        {userClickedAnalysis ?
                <Analysis listOfSegments={listOfDetails} setCurrentInfoAboutTest={setCurrentInfoAboutTest} setUserClickedAnalysis={setUserClickedAnalysis} currentInfoAboutTest={currentInfoAboutTest} />
            :
            <div className='d-flex'>
                <Col md={9}
                >
                        <ListOfDetails sideOfLighting={sideOfLighting} currentInfoAboutTest={currentInfoAboutTest} setCurrentInfoAboutTest={setCurrentInfoAboutTest} setCurrentTestId={setCurrentTestId} setSwiper={setSwiper} listOfDetails={listOfDetails} setListOfDetailsToAnalysis={setListOfDetails} />
                </Col>
                <Col md={3}>
                        <ControlPanel setSideOfLighting={setSideOfLighting} currentInfoAboutTest={currentInfoAboutTest} setCurrentInfoAboutTest={setCurrentInfoAboutTest}  currentTestId={currentTestId} listOfDetails={listOfDetails} swiper={swiper} setUserClickedAnalysis={setUserClickedAnalysis} />
                </Col>
            </div>}


        </AuthCtx.Provider>

    )
}

export default Main