import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Auth from '../auth/Auth'
import ListOfDetails from '../details/ListOfDetails'
import ControlPanel from '../panels/ControlPanel'
import "./Main.css"

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
const Main = () => {
    const [swiper, setSwiper] = useState(null)
    return (
        // <Row className='main'>
        <div className='d-flex'>
            <Col md={9}
            >
                <ListOfDetails listOfDetails={listOfDetails} setSwiper={setSwiper} />
            </Col>
            <Col md={3}>
                <ControlPanel listOfDetails={listOfDetails} swiper={swiper} />
            </Col>
        </div>

        // </Row>

    )
}

export default Main