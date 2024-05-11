import React from 'react'
import {Icon} from '@iconify/react'
import { useAuthContext } from '../contexts/auth-context'
import { Link } from 'react-router-dom'

function NavBar() {

  const {user, onLogout} = useAuthContext()

  return (
    <nav className='navbar bg-body-tertiary'>
      <div className='container-fluid'>
        <span className='navbar-brand mb-0 h1'>
          <Link to="/" className='text-reset text-decoration-none'>
            <strong>React Task Manager | </strong>
          </Link>
            <span className='small'>{user?.email}</span>            
        </span>
        { user && 
          <button className='btn btn-sm btn-danger d-flex align-items-center' onClick={() => onLogout()} ><Icon icon="uiw:logout" className='me-1'/>Logout</button>
        }
      </div>
    </nav>
  )
}

export default NavBar