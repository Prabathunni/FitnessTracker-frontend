import React from 'react'
import Header from '../Components/Header'

function Profile() {
  return (
    <div >
      <Header />
      <div className='vh-100 row  d-flex justify-content-center align-items-center'>

        <div className='col-lg-4'> </div>
        <div className='col-lg-4  text-center text-white'>
          <img width="240" height="240" className='rounded' src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R188092662&ga=GA1.1.372816841.1746347166&semt=ais_hybrid&w=740" alt="user" />
          <hr />
          <h4 className='mt-2'>User Name</h4>
          <hr />
          <p>userprofilegmail.com</p>
          <p >Age: <span className='fw-bolder'>20</span></p>
          <hr />
          <div className='d-flex gap-3 justify-content-center'>

            <p>Weight : <span className='fw-bolder bg-light text-danger p-2 rounded'>55 KG</span> </p>
            <p>Height : <span  className='fw-bolder bg-light text-danger p-2 rounded'>170 cm</span></p>


          </div>

          <hr />
          <button className='btn btn-outline-light'>Update</button>


        </div>
        <div className='col-lg-4'> </div>

      </div>
    </div>
  )
}

export default Profile