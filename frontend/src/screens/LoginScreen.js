import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <div className="text-center mb-4">
        <h2 className="fw-bold mb-2">Welcome Back</h2>
        <p className="text-muted">Sign in to access your account</p>
      </div>
      
      {error && <Message variant='danger'>{error}</Message>}
      
      {loading ? (
        <div className="text-center py-4">
          <Loader />
        </div>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <i className="fas fa-envelope text-muted"></i>
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 border-start-0 transition-all"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <div className="d-flex justify-content-between">
              <Form.Label>Password</Form.Label>
              <Link to="/forgot-password" className="text-decoration-none small">
                Forgot Password?
              </Link>
            </div>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <i className="fas fa-lock text-muted"></i>
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-2 border-start-0 border-end-0 transition-all"
              />
              <InputGroup.Text 
                className="bg-light border-start-0 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-muted`}></i>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <div className="d-grid gap-2 mb-4">
            <Button type="submit" variant="primary" className="py-2 fw-bold transition-all btn-hover-elevate">
              Sign In
            </Button>
          </div>

          <div className="text-center">
            <span className="text-muted">New Customer? </span>
            <Link 
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className="text-decoration-none fw-bold"
            >
              Create an account
            </Link>
          </div>
          
          <hr className="my-4" />
          
          <div className="text-center">
            <p className="text-muted small mb-0">
              By signing in, you agree to our 
              <button type="button" className="btn btn-link text-decoration-none ms-1">Terms of Use</button> and 
              <button type="button" className="btn btn-link text-decoration-none ms-1">Privacy Policy</button>
            </p>
          </div>
        </Form>
      )}
    </FormContainer>
  )
}

export default LoginScreen

