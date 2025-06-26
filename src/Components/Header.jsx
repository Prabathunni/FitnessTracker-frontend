import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Auth from './Auth'
import { useAuth } from '../contexts/AuthContext'
import { logoutUserApi } from '../services/userServices'


function Header() {

  const { isUserLogged, setIsUserLogged } = useAuth()
  const { showPopUp, setShowPopUp } = useAuth()
  const navigate = useNavigate()


  const logoutUser = async () => {

    const isConfirm = confirm("Are you sure to Logout")
    if (isConfirm) {
      try {
        await logoutUserApi()
        setIsUserLogged(false)
        navigate('/')
      } catch (error) {
        console.log("logging out failed", error);
      }
    }

  }




  return (
    <div className='container rounded d-flex  justify-content-center gap-5 flex-row  p-3 align-items-center'>

      <Link className='d-flex text-decoration-none' to={'/'} >
        <img src="/heart-rate.png" className='' style={{ width: "30px", height: "30px" }} alt="logo" />
        <h4 className='d-block'>Fitness Tracker</h4>
      </Link>

      {isUserLogged ?
        <div>

          <Dropdown >
            <Dropdown.Toggle className='px-3' variant="danger" id="dropdown-basic" size='sm' >

                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R188092662&ga=GA1.1.372816841.1746347166&semt=ais_hybrid&w=740"
                  alt="User"
                  width="40"
                  height="40"
                  className="rounded-circle d-none d-md-inline"
                /><span className='px-1'> Hello Username</span>

            </Dropdown.Toggle>

            <Dropdown.Menu className='p-2 text-center'>
              <Link to={'/profile'} className='btn btn-outline-secondary w-100 mb-2 text-dark'><i className="fa-solid fa-user"></i> My Profile</Link>
              <button onClick={logoutUser} className='btn btn-danger w-100 text-light'><i className="fa-solid fa-right-from-bracket"></i> Logout</button>

            </Dropdown.Menu>
          </Dropdown>

        </div>
        :
        <h4 className='text-danger'> Hey Brothaa!</h4>

      }

      {
        showPopUp && <Auth />
      }


    </div>
  )
}

export default Header