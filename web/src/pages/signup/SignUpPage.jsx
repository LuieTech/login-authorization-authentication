import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { login, registerUser } from '../../services/users-service'
import { useAuthContext } from '../../contexts/auth-context'


function SignUpPage() {

  const {register, handleSubmit } = useForm()
  const {onLogin} = useAuthContext();
  const navigate = useNavigate()


function handleSignup(formData){

  return registerUser(formData)
    .then(() => login(formData))
    .then((user) => onLogin(user))
    .catch((err) => console.log('Error during register or login', err))

}

  return (
    <div className='m-5'>
    <h1>Register</h1>
    <form onSubmit={handleSubmit(handleSignup)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input autoComplete='email' type="text" className="form-control" id="name" {...register("name")}/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input autoComplete='email' type="email" className="form-control" id="email" {...register("email")}/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input autoComplete='password' type="password" className="form-control" id="password" {...register("password")}/>
      </div>
      <div className="mb-3">
        <label htmlFor="avatar" className="form-label">Email address</label>
        <input autoComplete='' type="file" className="form-control" id="avatar" {...register("avatar")}/>
      </div>
      <div className='d-flex gap-3'>
        <button type="submit" className="btn btn-primary rounded-3 ">Send</button>
        <button type='button' className='border rounded-3 text-muted' onClick={() => navigate("/login")}>Login</button>
      </div>

    </form>
  </div>

  )
}

export default SignUpPage