import Cookies from 'js-cookie'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Spinner, Table } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthCtx } from '../context/authContext'
import axiosInstance from '../helpers/axios'
import { ITest } from '../types/interfaces'
import "./History.css"
const History = () => {
    const userName = Cookies.get("username")
    const [listOfTests, setListOfTests] = useState<Array<ITest | undefined>>([])
    const [listOfTestsIsEmpty, setListOfTestsIsEmpty] = useState(false)
    const nav = useNavigate()
    useEffect(() => {
        axiosInstance.get('/api/imaging/test/').then((res) => {
            {
                res.data.forEach((test: any) => {
                    axiosInstance.get(`/api/imaging/test/${test.id}/`).then(res => {
                        console.log(res.data)
                        setListOfTests(prevListOfTests => ([...prevListOfTests, res.data]))
                        // setListOfTests(prevListOfTests=>prevListOfTests.sort((a,b)=>a?.number - b?.number))

                    }).catch(er => console.log(er))
                })
            }
            res.data.lenght === 0 && setListOfTestsIsEmpty(true)
        })
    }, [])

    if (!userName) {
        return <Navigate to="/auth" replace />
    }
    return (
        <div className="history">
            <div className="history__nav d-flex justify-content-between">
                <a onClick={() => nav(-1)} className='history__back btn btn-outline-primary'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5" stroke="#04306A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 19L5 12L12 5" stroke="#04306A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Назад
                </a>
                <Link to="/" className='history__back btn btn-primary '>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Новый тест
                </Link>
            </div>
            <h2 className='history__title text-start'>
                История тестов
            </h2>
            {
                listOfTests.length !== 1 ?
                    listOfTestsIsEmpty ?
                        <h1>Данных нет</h1> :
                        <Table bordered striped className='history__table w-100'>
                            <thead className='history__head'>
                                <tr >
                                    <th style={{ width: "78px" }}>Номер теста</th>
                                    <th style={{ width: "200px" }}>Вид/профиль продукции</th>
                                    <th style={{ width: "200px" }}>Номер плавки/ручья</th>
                                    <th style={{ width: "80px" }}>ОР</th>
                                    <th style={{ width: "80px" }}>ОХН</th>
                                    <th style={{ width: "200px" }}>Сечение, мм</th>
                                    <th style={{ width: "120px" }}>Дата</th>
                                    <th >Комментарий</th>
                                    <th style={{ width: "90px" }}>Анализ</th>
                                </tr>
                            </thead>

                            <tbody className='history__body'>
                                {listOfTests?.sort((a, b) => {
                                    console.log(a, b, Number(a?.number) - Number(b?.number))
                                    return Number(b?.id) - Number(a?.id)
                                }).map((el) => {
                                    return (
                                        <tr>
                                            <th><p>
                                                <Link className='history__link' to={`/history/${el?.id}`}>
                                                    {el?.number}
                                                </Link>
                                            </p>
                                            </th>
                                            <th><p>
                                                {el?.product_type}
                                            </p>
                                            </th>
                                            <th>
                                                <p>
                                                    {el?.melting_number}
                                                </p>
                                            </th>
                                            <th>
                                                <p>
                                                    {el?.score.ОР}
                                                </p>
                                            </th>
                                            <th>
                                                <p>
                                                    {el?.score.ОХН}
                                                </p>
                                            </th>
                                            <th>{el?.segments?.map(segment => (<p>{segment.width}x{segment.length}</p>))}</th>


                                            <th>
                                                <p>
                                                    {el?.date}
                                                </p>
                                            </th>
                                            <th
                                            >
                                                <p

                                                    style={{
                                                        textAlign: "justify"
                                                    }}
                                                //  style={{ maxWidth: "250px", margin: "0 auto", overflowY: "scroll" }}

                                                >
                                                    {el?.comment}
                                                </p>
                                            </th>
                                            <th style={{ background: el?.date ? "" : "#FFD6D8" }}>
                                                {el?.date ?
                                                    <div>Есть</div>
                                                    :
                                                    <div>
                                                        Нет
                                                    </div>
                                                }
                                            </th>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    :
                    <Spinner animation='border' />
            }

        </div>
    )
}

export default History