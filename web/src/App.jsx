import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import LoginPage from './pages/login/LoginPage'
import NavBar from './components/NavBar'
import TaskList from './pages/tasks/list'
import SignUpPage from './pages/signup/SignUpPage'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/sign-up" element={<SignUpPage />} />

      </Routes>
    </>
  )
}

export default App
