import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import AnalysisConrolPanel from '../../panels/AnalysisConrolPanel'
import ListOfAnalysedParts from './ListOfAnalysedParts'
const listOfDetails: object[] = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},

]
const Analysis = () => {
  const [swiper, setSwiper] = useState(null)
  return (
    // <Row className='analysis'>
    <div className="analysis d-flex">
      <Col md="9">
        <ListOfAnalysedParts listOfDetails={listOfDetails} setSwiper={setSwiper} />
      </Col>
      <Col md="3">
        <AnalysisConrolPanel listOfDetails={listOfDetails} swiper={swiper} />
      </Col>
    </div>


    // </Row>
  )
}

export default Analysis