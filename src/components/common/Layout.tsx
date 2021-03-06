import Header from './Header'
import Main from './Main'
import { Route, Routes } from 'react-router-dom'
import Auth from '../auth/Auth'
import History from '../History'
import Analysis from '../details/analysis/Analysis'
import { createContext, useState } from 'react'
import { AuthCtx } from '../../context/authContext'
import RouteAnalysis from '../details/analysis/RouteAnalysis'
import Cookies from 'js-cookie'

const Layout = () => {
    const userName = Cookies.get("username")
    return (
        <div className='h-100 position-relative'>
            <Header />
            <Routes>
                <Route path='/auth' element={<Auth />} />
                <Route path='/' element={<Main />} />
                <Route path="/history" element={<History />} />
                <Route path="/history/:id" element={<Main />} />
            </Routes>

        </div>
    )
}


export default Layout