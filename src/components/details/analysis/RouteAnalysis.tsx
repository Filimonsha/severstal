import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../helpers/axios'
import { ITest } from '../../../types/interfaces'
import AnalysisConrolPanel from '../../panels/AnalysisConrolPanel'
import ListOfAnalysedParts from './ListOfAnalysedParts'
const RouteAnalysis = () => {
    const [swiper, setSwiper] = useState(null)
    const [currentInfoAboutTest, setCurrentInfoAboutTest] = useState<ITest|any>(null)
    const { id } = useParams()
    useEffect(() => {
        axiosInstance.get(`/api/imaging/test/${id}/`)
        .then(res=>setCurrentInfoAboutTest(res.data))
    }, [])
    return (
        <div className="analysis d-flex">
            <Col md="9">
                <ListOfAnalysedParts isHistoryRoute={true} currentInfoAboutTest={currentInfoAboutTest} setCurrentInfoAboutTest={setCurrentInfoAboutTest} setSwiper={setSwiper} />
            </Col>
            <Col md="3">
                <AnalysisConrolPanel isHistoryRoute={true} setCurrentInfoAboutTest={setCurrentInfoAboutTest} currentInfoAboutTest={currentInfoAboutTest} swiper={swiper}  />
            </Col>
        </div>
    )
}

export default RouteAnalysis