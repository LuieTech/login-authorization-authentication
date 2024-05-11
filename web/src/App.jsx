import { useState } from 'react'
import {Routes, Route, Navigate } from "react-router-dom"
import LoginPage from './pages/login/LoginPage'
import NavBar from './components/NavBar'
import TaskList from './pages/tasks/list'
import SignUpPage from './pages/signup/SignUpPage'
import TaskDetail from './pages/tasks/detail'
import { Authenticated, OpenRoute } from './components/Authentication/Authenticated'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/tasks" element={ 
           <Authenticated><TaskList /></Authenticated>
          } />
        <Route path="/login" element={
          <OpenRoute><LoginPage /></OpenRoute> 
        } /> 
        <Route path="/register" element={
          <OpenRoute><SignUpPage /></OpenRoute> 
          } />
        <Route path="/tasks/:id" element={
          <Authenticated><TaskDetail /></Authenticated> 
          } />
        <Route path='*' element={<Navigate to="/tasks" />} />

      </Routes>
    </>
  )
}

export default App
