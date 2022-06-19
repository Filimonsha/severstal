import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ISegment, ITest } from '../../../types/interfaces'
import AnalysisConrolPanel from '../../panels/AnalysisConrolPanel'
import ListOfAnalysedParts from './ListOfAnalysedParts'
interface IProps {
  setUserClickedAnalysis: React.Dispatch<React.SetStateAction<boolean>>,
  currentInfoAboutTest: ITest,
  setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,


}
const Analysis = (props: IProps) => {
  const [swiper, setSwiper] = useState(null)
  return (
    <div className="analysis d-flex h-100">
      <Col md="9" className="overflow-scroll">
        <ListOfAnalysedParts isHistoryRoute={false} currentInfoAboutTest={props.currentInfoAboutTest} setCurrentInfoAboutTest={props.setCurrentInfoAboutTest} setSwiper={setSwiper} />
      </Col>
      <Col md="3">
        <AnalysisConrolPanel isHistoryRoute={false} setCurrentInfoAboutTest={props.setCurrentInfoAboutTest} currentInfoAboutTest={props.currentInfoAboutTest} swiper={swiper} setUserClickedAnalysis={props.setUserClickedAnalysis} />
      </Col>
    </div>


  )
}

export default Analysis