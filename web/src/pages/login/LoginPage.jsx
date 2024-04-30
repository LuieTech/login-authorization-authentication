import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { login } from '../../services/users-service'
import { useNavigate } from "react-router-dom"

function LoginPage() {

  const {register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()

  function handleLogin(data){

    login(data).then(() => {
      navigate("/tasks")
    })
    reset()

  }

  return <div className='m-5'>
    <h1>Login</h1>
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input autoComplete='email' type="email" className="form-control" id="email" {...register("email")}/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input autoComplete='password' type="password" className="form-control" id="password" {...register("password")}/>
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  </div>
}

export default LoginPage