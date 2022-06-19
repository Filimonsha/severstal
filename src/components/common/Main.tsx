import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { AuthCtx } from '../../context/authContext'
import { sessionId } from '../../helpers/api'
import axiosInstance from '../../helpers/axios'
import { ISegment, ITest } from '../../types/interfaces'
import Auth from '../auth/Auth'
import Analysis from '../details/analysis/Analysis'
import ListOfDetails from '../details/ListOfDetails'
import ControlPanel from '../panels/ControlPanel'
import "./Main.css"

const Main = () => {
    const userName = Cookies.get("username")
    const [swiper, setSwiper] = useState(null)
    const [listOfDetails, setListOfDetails] = useState<Array<ISegment>>([])
    const [userClickedAnalysis, setUserClickedAnalysis] = useState(false)
    const [currentTestId, setCurrentTestId] = useState("")
    const [sideOfLighting, setSideOfLighting] = useState(false)
    const nav = useNavigate()
    const { id } = useParams()
    const [currentInfoAboutTest, setCurrentInfoAboutTest] = useState<ITest | any>({
        "id": null,
        "number": null,
        "product_type": null,
        "measurement_technique": null,
        "melting_number": null,
        "comment": "",
        "date": null,
        "segments": []
    })

    useEffect(() => {
        console.log(id)
        if (id) {
            axiosInstance.get(`/api/imaging/test/${id}/`)
                .then(res => {
                    setCurrentInfoAboutTest(res.data)
                    console.log("ПИС", currentInfoAboutTest)
                })
        }
    }, [])


    if (!userName) {
        return <Navigate to="/auth" replace />
    }
    return (

        <AuthCtx.Provider value={{ currentTestId, setCurrentTestId }}>

            {userClickedAnalysis ?
                <Analysis setCurrentInfoAboutTest={setCurrentInfoAboutTest} setUserClickedAnalysis={setUserClickedAnalysis} currentInfoAboutTest={currentInfoAboutTest} />
                :
                <div className='d-flex'>
                    <Col md={9}
                    >
                        <ListOfDetails swiper={swiper} sideOfLighting={sideOfLighting} currentInfoAboutTest={currentInfoAboutTest} setCurrentInfoAboutTest={setCurrentInfoAboutTest} setSwiper={setSwiper} setListOfDetailsToAnalysis={setListOfDetails} />
                    </Col>
                    <Col md={3}>
                        <ControlPanel setSideOfLighting={setSideOfLighting} currentInfoAboutTest={currentInfoAboutTest} setCurrentInfoAboutTest={setCurrentInfoAboutTest} swiper={swiper} setUserClickedAnalysis={setUserClickedAnalysis} />
                    </Col>
                </div>}


        </AuthCtx.Provider>

    )
}

export default Main