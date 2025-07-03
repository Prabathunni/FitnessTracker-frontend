import React, { useEffect, useState } from 'react'
import AdminSidePanel from '../Components/AdminSidePanel'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { deleteUserByidAPI, getaUSerByIdAPI } from '../services/userServices';

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
        
        if(confirmDelete){
            try {
                const result = await deleteUserByidAPI(userID)
                alert(result.data.response || "User Deleted Successfully")
                navigate('/allusers')

            } catch (error) {
                console.log(error);
                
            }
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
                                        <h6>Email Address: <span style={{textDecoration:"underline"}}>{userData?.email}</span></h6>
                                        <h6>Gender: <span style={{textDecoration:"underline"}}>{userData?.gender}</span></h6>
                                        <h6>AGE: <span style={{textDecoration:"underline"}}>{userData?.age}</span></h6>
                                        <h6>GOAL: <span style={{textDecoration:"underline"}}>{userData?.goal}</span></h6>
                                        <h6>ACTIVTY LEVEL: <span style={{textDecoration:"underline"}}>{userData?.activityLevel}</span></h6>
                                    </div>


                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <div className='d-flex justify-content-between'>
                                    <p>Account Created In: <span className='ms-2'> {userData?.createdAt} </span></p>

                                    <button onClick={()=>deleteUser(userData?._id)} className='btn btn-danger btn-sm'>Delete User <i className="fa-solid fa-trash ms-2"></i></button>
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