import React, { useEffect, useState } from 'react'
import AdminSidePanel from '../Components/AdminSidePanel'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { blockUserAPI, deleteUserByidAPI, getaUSerByIdAPI } from '../services/userServices';
import { toast, ToastContainer } from 'react-toastify';

function ViewUser() {


    const { id } = useParams();
    const [userData, setUserData] = useState()
    const navigate = useNavigate()

    const getUserDetails = async () => {
        try {
            if (id) {
                const result = await getaUSerByIdAPI(id)
                setUserData(result.data.response)
            }
        } catch (error) {
            console.log(error);

        }
    }
    console.log(userData);


    const deleteUser = async (userID) => {
        const confirmDelete = window.confirm("Proceed to delete user:")

        if (confirmDelete) {
            try {
                const result = await deleteUserByidAPI(userID)
                toast.success(result.data.response || "User Deleted Successfully")
                navigate('/allusers')

            } catch (error) {
                // console.log(error);
                toast.error(error.response.data.response)

            }
        }

    }


    const blockuser = async (userID) => {

            try {
                const result = await blockUserAPI(userID)
                // console.log(result);
                // console.log(result.data.response);                  
                toast.success(result?.data.response)
                getUserDetails()


            } catch (error) {
                // console.log(error);
                toast.error(error.response.data.response)

            }
        
    }



    useEffect(() => {
        getUserDetails()
    }, [])


    return (
        <div className='bg-light' style={{ minHeight: "100vh" }}>

            <div className='d-flex'>
                <AdminSidePanel />

                <div className='w-100'>
                    <Link to={'/allusers'} className='text-decoration-none ms-1'><i className="fa-solid fa-circle-chevron-left me-1"></i>Back</Link>
                    <h2 className='text-center'><i class="fa-solid fa-user me-2"></i> User</h2>
                    <div style={{ marginTop: "30px" }} className='p-4'>

                        <Card >
                            <Card.Header>UserID: <span>{userData?._id}</span> </Card.Header>
                            <Card.Body>
                                <Card.Title>User Name : {userData?.name}</Card.Title>

                                <div className='mt-4'>
                                    <h6>Email Address: <span style={{ textDecoration: "underline" }}>{userData?.email}</span></h6>
                                    <h6>Gender: <span style={{ textDecoration: "underline" }}>{userData?.gender}</span></h6>
                                    <h6>AGE: <span style={{ textDecoration: "underline" }}>{userData?.age}</span></h6>
                                    <h6>GOAL: <span style={{ textDecoration: "underline" }}>{userData?.goal}</span></h6>
                                    <h6>ACTIVTY LEVEL: <span style={{ textDecoration: "underline" }}>{userData?.activityLevel}</span></h6>
                                </div>


                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <div className='d-flex justify-content-between'>
                                    <p>Account Created In: <span className='ms-2'> {userData?.createdAt} </span></p>

                                    <div>
                                    <button onClick={() => blockuser(userData?._id)} className={userData?.status==='active'?'btn btn-warning btn-sm me-2': 'btn btn-success btn-sm me-2'}>{userData?.status==='active'?"Block user":"Unblock User" }<i class="fa-solid fa-user ms-2"></i></button>
                                    <button onClick={() => deleteUser(userData?._id)} className='btn btn-danger btn-sm'>Delete User <i className="fa-solid fa-trash ms-2"></i></button>
                                    </div>

                                </div>
                            </Card.Footer>
                        </Card>

                    </div>

                </div>
            </div>



        </div>
    )
}

export default ViewUser