import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutAdminAPI } from '../services/userServices'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'


function AdminSidePanel() {

  const { setIsUserLogged } = useAuth()

  const navigate = useNavigate()

  const logoutAdmin = async () => {
    const confirmation = window.confirm("Logout admin")
    if(confirmation){
    try {
      await logoutAdminAPI();
      setIsUserLogged(false)
      navigate('/')
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message)
      

    }
    }
  }

  return (
    <div className='bg-dark d-flex flex-column justify-content-start' style={{ maxWidth: "300px",minHeight:"100vh" }}>

      <div className='d-flex gap-1 text-white p-5'>
        <img src="/heart-rate.png" className='' style={{ width: "20px", height: "20px" }} alt="logo" />
        <h6 className=''>Fitness Tracker</h6>
      </div>

      <hr className='text-light' />


      <div className='d-flex flex-column gap-3 ms-5 mt-5'>
        <Link to={'/allusers'} className='text-decoration-none text-light '> <i className="fa-solid fa-users me-2"></i>Users</Link>
        <Link to={'/allworkouts'} className='text-decoration-none text-light '> <i className="fa-solid fa-dumbbell me-2"></i>Workouts</Link>
      </div>



      <div className="mt-auto p-4">
        <button onClick={logoutAdmin} className='btn btn-outline-danger w-100'>
          <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
        </button>
      </div>




    </div>
  )
}

export default AdminSidePanel