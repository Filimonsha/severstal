import Header from './Header'
import Main from './Main'
import { Route, Routes } from 'react-router-dom'
import Auth from '../auth/Auth'
import History from '../History'
import Analysis from '../details/analysis/Analysis'

const Layout = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/auth' element={<Auth />} />
                <Route path='/' element={<Main />} />
                <Route path="/history" element={<History />} />
                <Route path='/analysis' element={<Analysis />} />
            </Routes>
        </div>
    )
}


export default Layout