import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthCtx, BASE_URL } from '../../context/authContext'
import axiosInstance from '../../helpers/axios'

function Auth() {

  const [authError, setAuthError] = useState(null)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()

  const handleAuth = () => {
    axiosInstance.post(`/api/auth/login/`, {
      username: login,
      password: password,
    },)
      .then((res) => {
        console.log(res)
        nav("/")
      })
      .catch((res) => {
        console.log("ssssssssssssssss", res)
      })
  }
  return (
    <Container className="w-25">
      <Row className=''>
        <h4 className='text-start mb-2'>
          Вход
        </h4>
        <Form>
          <Form.Control value={login} onChange={(e) => setLogin(e.target.value)} type='text' className="mb-2" placeholder='Логин' />
          <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='mb-2' placeholder='Пароль' />
          <Button className="d-flex align-items-center analysis-control-panel__back" variant="primary" onClick={handleAuth}>
            Войти
          </Button>
        </Form>
        {authError &&
          <Alert variant="danger">
            Неверный логин или пароль.
          </Alert>
        }
      </Row>
    </Container>
  )
}

export default Auth