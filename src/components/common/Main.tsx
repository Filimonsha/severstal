import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { AuthCtx } from '../../context/authContext'
import Auth from '../auth/Auth'
import ListOfDetails from '../details/ListOfDetails'
import ControlPanel from '../panels/ControlPanel'
import "./Main.css"

// const listOfDetails: object[] = [
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},
//     {},

// ]
const Main = () => {
    const [swiper, setSwiper] = useState(null)
    const [listOfDetails,setListOfDetails] = useState<Array<object>>([])
    const authCtx = useContext(AuthCtx)
    const nav = useNavigate()
    // useEffect(() => {
    //     if(!authCtx.userIsAuth){
    //         console.log("АААААААААааааааааа")
    //         nav("/auth")
    //     }

    // }, [])



    return (
        // <Row className='main'>
        <div className='d-flex'>
            <Col md={9}
            >
                <ListOfDetails  setSwiper={setSwiper} />
            </Col>
            <Col md={3}>
                <ControlPanel listOfDetails={listOfDetails} swiper={swiper} />
            </Col>
        </div>

        // </Row>

    )
}

export default Main