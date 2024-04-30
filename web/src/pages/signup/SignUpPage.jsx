import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { signup } from '../../services/users-service'

function SignUpPage() {

  const {register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()

function handleSignup(data){
  signup(data).then(() => {
    navigate("/login")

  }).catch(err => console.log(err))
  reset()
}

  return (
    <div className='m-5'>
    <h1>Sign up</h1>
    <form onSubmit={handleSubmit(handleSignup)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input autoComplete='email' type="email" className="form-control" id="email" {...register("email")}/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input autoComplete='password' type="password" className="form-control" id="password" {...register("password")}/>
      </div>
      <div className='d-flex gap-3'>
        <button type="submit" className="btn btn-primary rounded-3 ">Sign up</button>
        <button type='button' className='border rounded-3 text-muted' onClick={() => navigate("/login")}>Login</button>
      </div>

    </form>
  </div>




  )
}

export default SignUpPage