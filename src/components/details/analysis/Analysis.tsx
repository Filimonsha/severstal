import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ISegment, ITest } from '../../../types/interfaces'
import AnalysisConrolPanel from '../../panels/AnalysisConrolPanel'
import ListOfAnalysedParts from './ListOfAnalysedParts'
interface IProps {
  listOfSegments: Array<ISegment>,
  setUserClickedAnalysis: React.Dispatch<React.SetStateAction<boolean>>,
  currentInfoAboutTest: ITest,
  setCurrentInfoAboutTest: React.Dispatch<React.SetStateAction<ITest>>,


}
const Analysis = (props: IProps) => {
  const [swiper, setSwiper] = useState(null)
  return (
    // <Row className='analysis'>
    <div className="analysis d-flex">
      <Col md="9">
        <ListOfAnalysedParts  currentInfoAboutTest={props.currentInfoAboutTest} setCurrentInfoAboutTest={props.setCurrentInfoAboutTest} listOfDetails={props.listOfSegments} setSwiper={setSwiper} />
      </Col>
      <Col md="3">
        <AnalysisConrolPanel setCurrentInfoAboutTest={props.setCurrentInfoAboutTest} currentInfoAboutTest={props.currentInfoAboutTest} listOfDetails={props.listOfSegments} swiper={swiper} setUserClickedAnalysis={props.setUserClickedAnalysis} />
      </Col>
    </div>


    // </Row>
  )
}

export default Analysis