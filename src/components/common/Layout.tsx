import Header from './Header'
import Main from './Main'
import { Route, Routes } from 'react-router-dom'
import Auth from '../auth/Auth'
import History from '../History'
import Analysis from '../details/analysis/Analysis'
import { createContext, useState } from 'react'
import { AuthCtx } from '../../context/authContext'

const Layout = () => {
    const MainContext = AuthCtx
    const [userIsAuth, setUserIsAuth] = useState(false)
    return (
        <div>
            <MainContext.Provider value={{userIsAuth, setUserIsAuth}}>
                <Header />
                <Routes>
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/' element={<Main />} />
                    <Route path="/history" element={<History />} />
                    <Route path='/analysis' element={<Analysis />} />
                </Routes>
            </MainContext.Provider>

        </div>
    )
}


export default Layout