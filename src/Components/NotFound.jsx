import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='d-flex align-items-center justify-content-center vh-100 bg-light'>
        <div>
        <h1>404 - Not Found</h1>
        <Link to={'/'}>Go Home</Link>
        </div>
    </div>
  )
}

export default NotFound