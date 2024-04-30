import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import LoginPage from './pages/login/LoginPage'
import NavBar from './components/NavBar'
import TaskList from './pages/tasks/list'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </>
  )
}

export default App
