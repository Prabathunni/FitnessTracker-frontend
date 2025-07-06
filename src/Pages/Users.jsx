import React, { useEffect, useState } from 'react'
import AdminSidePanel from '../Components/AdminSidePanel'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { getAllUSersAPI } from '../services/userServices';


function Users() {

    const [allUserData, setAllUsersData] = useState();


    const getAllUsers = async () => {
        try {
            const result = await getAllUSersAPI()
            console.log(result.data);
            setAllUsersData(result.data.response)

        } catch (error) {
            console.log(error);

        }
    }

    console.log(allUserData);



    useEffect(() => {
        getAllUsers()
    }, [])



    return (
        <div className='bg-light' style={{ minHeight: "100vh" }}>

            <div className='d-flex'>
                <AdminSidePanel />

                <div className='w-100'>
                    <Link to={'/admin'} className='text-decoration-none ms-1'><i className="fa-solid fa-circle-chevron-left me-1"></i>Back</Link>
                    <h2 className='text-center'><i class="fa-solid fa-users me-2"></i>All Users</h2>
                    <hr />
                    <div style={{ marginTop: "30px" }} className='p-4 d-flex flex-wrap gap-4'>

                        {
                            allUserData ?
                                (allUserData.map((user) => (
                                    <Link to={`/allusers/${user?._id}`} key={user?._id} className='text-decoration-none shadow'>
                                        <Card border="danger" style={{ width: '18rem', height:'100%' }}>
                                             {
                                                user?.status === 'banned' ?
                                                    <Card.Header className='bg-danger text-white'>Banned</Card.Header>
                                                    : user?.status === 'inactive' ?
                                                        <Card.Header className='bg-warning text-dark'>Inactive</Card.Header>
                                                        : <Card.Header className='bg-success text-white'>Active</Card.Header>
                                            } 
                                            <Card.Body>
                                                <Card.Title>username: {user?.name}</Card.Title>
                                                <Card.Text>email address: {user?.email}</Card.Text>
                                                {/* <Card.Text>status: {user?.status}</Card.Text> */}
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                ))
                                ) :
                                (<h5>No Users Records...</h5>)

                        }
                    </div>

                </div>
            </div>



        </div>
    )
}

export default Users