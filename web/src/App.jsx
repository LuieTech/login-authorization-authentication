import { useState } from 'react'
import {Routes, Route, Navigate, useLocation} from "react-router-dom"
import LoginPage from './pages/login/LoginPage'
import NavBar from './components/NavBar'
import TaskList from './pages/tasks/list'
import SignUpPage from './pages/signup/SignUpPage'
import TaskDetail from './pages/tasks/detail'
import { useAuthContext } from './contexts/auth-context'

function App() {
  // const { user } = useAuthContext();
  // const location = useLocation();

  // function AuthRoute(props){ this doesn't work cause it needs to be Route or React.Fragment
  //   return <Route {...props} />
  // }
  
  // if(!user && location.pathname !== "/login") return <Navigate to="/login" />

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path='*' element={<Navigate to="/tasks" />} />

      </Routes>
    </>
  )
}

export default App
