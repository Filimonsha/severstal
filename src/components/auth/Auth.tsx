import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { Alert, Button, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../helpers/axios'

function Auth() {
  const [authError, setAuthError] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axiosInstance.post(`/api/auth/login/`, {
      username: login,
      password: password,
    })
      .then((res) => {
        Cookies.set("username", res.data.username)
        nav("/")
      })
      .catch((res) => {
        setAuthError(true)
      })
  }
  return (
    <Container className="w-25 auth__form">
      <Row className='mt-5'>
        <h4 className='text-start mb-3'>
          Вход
        </h4>
        <Form onSubmit={handleAuth} className="mb-2">

          <Form.Control value={login} onChange={(e) => setLogin(e.target.value)} type='text' className="auth__control mb-3" placeholder='Логин' />
          <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='auth__control mb-3' placeholder='Пароль' />
          <Button className="d-flex align-items-center analysis-control-panel__back" variant="primary" type="submit"  >
            ВОЙТИ
          </Button>

        </Form>
        {authError &&
          <Alert variant="danger" className='rounded-0'>
            Неверный логин или пароль.
          </Alert>
        }
      </Row>
    </Container>
  )
}

export default Auth