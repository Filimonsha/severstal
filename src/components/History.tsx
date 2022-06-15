import React, { useContext, useEffect, useState } from 'react'
import { Alert, Spinner, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthCtx } from '../context/authContext'
import axiosInstance from '../helpers/axios'
import { ITest } from '../types/interfaces'
import "./History.css"
const History = () => {
    const [listOfTests, setListOfTests] = useState<Array<ITest | undefined>>([])
    const nav = useNavigate()
    useEffect(() => {
        axiosInstance.get('/api/imaging/test/').then((res) => {
            {
                // setListOfTests(res.data)
                res.data.forEach((test: any) => {
                    axiosInstance.get(`/api/imaging/test/${test.id}/`).then(res => {
                        console.log(res.data)
                        setListOfTests(prevListOfTests => ([...prevListOfTests, res.data]))


                    }).catch(er => console.log(er))
                })
            }
        })
    }, [])

    return (
        <div className="history">
            <div className="history__nav d-flex justify-content-between">
                <Link to="/" className='history__back btn btn-outline-primary'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5" stroke="#04306A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 19L5 12L12 5" stroke="#04306A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Назад
                </Link>
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
                listOfTests.length !== 0 ?
                    <Table bordered striped className='history__table w-100'>
                        <thead>
                            <tr>
                                <th>Номер теста</th>
                                <th>Вид/профиль продукции</th>
                                <th>Номер плавки/ручья</th>
                                <th>ОР</th>
                                <th>ОХН</th>
                                <th>Сечение, мм</th>
                                <th>Дата</th>
                                <th>Комментарий</th>
                                <th>Анализ</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listOfTests?.map((el) => {
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
                                        <th className='text-center'>
                                            <p style={{ maxWidth: "250px", margin: "0 auto", overflowY: "scroll" }}>
                                                {el?.comment}
                                            </p>
                                        </th>
                                        <th style={{ background: el?.date ? "none" : "#FFD6D8" }}>
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