import React, { useContext, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthCtx } from '../context/authContext'
import "./History.css"
const History = () => {
    const userIsAuth = useContext(AuthCtx)

    useEffect(()=>{
        
    },[])

    const listOfTest=[
        {
            1:"2022.05.0001",
            2:"Сляб литой",
            3:"707802 0102",
            4:"4",
            5:"2",
            6:"123 х 3577",
            7:"09.05.2022",
            8:"Нет",
            9:false
        },
        {
            1: "2022.05.0001",
            2: "Сляб литой",
            3: "707802 0102",
            4: "4",
            5: "2",
            6: "123 х 3577",
            7: "09.05.2022",
            8: "Нет",
            9: false
        }
    ]
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
            <Table bordered striped className='history__table'>
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
                    {listOfTest.map((el)=>{
                        return (
                            <tr>
                                <th>Номер теста</th>
                                <th>Вид/профиль продукции</th>
                                <th>Номер плавки/ручья</th>
                                <th>ОР</th>
                                <th>ОХН</th>
                                <th>Сечение, мм</th>
                                <th>Дата</th>
                                <th>Комментарий</th>


                                    {el[9]===true?
                                    <th className='history__suc'>
                                        Есть
                                    </th> :
                                    <th className='history__false'>
                                        Нет
                                    </th>
                                    }
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default History