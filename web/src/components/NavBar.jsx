import React from 'react'
import { useAuthContext } from '../contexts/auth-context'

function NavBar() {

  const value = useAuthContext()

  return (
    <nav className='p-4 text-secondary'>
      <div className='container-fluid'>
        <span className='navbar-brand mb-0 h1'>
          <strong>React Task Manager | {value.user?.email}</strong>
        </span>
      </div>
    </nav>
  )
}

export default NavBar