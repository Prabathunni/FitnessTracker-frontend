import React from 'react'
import AdminSidePanel from '../Components/AdminSidePanel'


function AdminPage() {
  return (
    <div className='bg-light' style={{ minHeight: "100vh" }}>

      <div className='d-flex'>
        <AdminSidePanel />

        <div className='p-3 d-flex flex-column justify-content-center align-items-center w-100'>
          <h2>Welcome Admin</h2>
          <ul>
            <li>Monitor Users</li>
            <li>Monitor Workouts </li>
            <li>Add Exercises</li>
          </ul>

        </div>




      </div>


    </div>
  )
}

export default AdminPage