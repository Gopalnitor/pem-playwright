import React from "react"
import { useNavigate } from "react-router-dom"
import useForm from "../utils/useForm"
import validate from "../utils/loginFormValidationRules"
import { Button, Form, TextInput } from "@carbon/react"

import "../styles/form.css"
import "../styles/header.css"

const LoginForm = (props) => {
  const navigate = useNavigate()
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  )

  function login() {
    navigate("/dashboard")
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <span className="header-title">Partner Engagement Manager</span>
        </div>
      </div>
      <div className="login-container">
        <Form id="login-form" aria-label="login form" className="login-form">
          <span className="login-text form-input">Login</span>
          <TextInput
            id="email"
            className="form-input"
            labelText="Email Address"
            placeholder="some@gmail.com"
            name="email"
            onChange={handleChange}
            value={values.email || ""}
            invalid={errors.email}
            invalidText={errors.email}
          />
          <TextInput
            id="password"
            type="password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            className="form-input"
            labelText="Password"
            invalid={errors.password}
            invalidText={errors.password}
            name="password"
            onChange={handleChange}
            value={values.password || ""}
          />
          <Button
            id="signInBtn"
            type="submit"
            className="form-input"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form>
      </div>
    </>
  )
}

export default LoginForm
