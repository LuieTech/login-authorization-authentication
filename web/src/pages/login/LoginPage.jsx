import React from 'react'
import { useForm } from "react-hook-form"
import { login } from '../../services/users-service'
import { Navigate, useNavigate } from "react-router-dom"
import { useAuthContext } from '../../contexts/auth-context'


function LoginPage() {

  const {register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { onLogin, user } = useAuthContext();

  function handleLogin(data){

    login(data).then((res) => {
      onLogin(res)

    })
    reset()
  }

  if(user) return <Navigate to={"/"} />



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
      <div className='d-flex gap-3'>
        <button type="submit" className="btn btn-primary rounded-3 ">Login</button>
        <button type='button' className='border rounded-3 text-muted' onClick={() => navigate("/sign-up")}>Sign up</button>
      </div>
    </form>
  </div>
}

export default LoginPage