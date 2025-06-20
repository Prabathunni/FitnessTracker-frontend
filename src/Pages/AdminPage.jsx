import React from 'react'

function AdminPage() {
  return (
    <div className='bg-danger vh-100'>

      <div className='d-flex flex-column align-items-center justify-content-center p-4'>

        <div className='d-flex gap-1 text-white'  >
          <img src="/heart-rate.png" className='' style={{ width: "30px", height: "30px" }} alt="logo" />
          <h4 className='d-block'>Fitness Tracker | Admin Panel</h4>
        </div>


        <div class="container mt-5 bg-light rounded p-2">
          <h2 class="mb-2 text-danger">User Table</h2>
          <div class="table-responsive">
            <table class="table table-striped table-bordered table-hover">
              <thead class="table-light">
                <tr>
                  <th>username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Prabath</td>
                  <td>prabath@example.com</td>
                  <td><button className='btn text-danger'>Delete User </button></td>
                </tr>
                <tr>
                  <td>Aarav</td>
                  <td>aarav@example.com</td>
                  <td><button className='btn text-danger'>Delete User </button></td>
                </tr>
                <tr>
                  <td>Meera</td>
                  <td>meera@example.com</td>
                  <td><button className='btn text-danger'>Delete User </button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>



      </div>

    </div>
  )
}

export default AdminPage