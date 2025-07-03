import React, { useEffect, useState } from 'react'
import AdminSidePanel from '../Components/AdminSidePanel'
import { Link } from 'react-router-dom'
import { getAllMucleWorkoutsAPI } from '../services/userServices';
import { Card } from 'react-bootstrap';


function AllWorkouts() {

    const [allworkouts, setAllWorkouts] = useState();

    const getAllMuscleWorkouts = async () => {
        try {
            const result = await getAllMucleWorkoutsAPI()
            // console.log(result);
            setAllWorkouts(result.data.response)


        } catch (error) {
            console.log(error);

        }
    }

    //  console.log(allworkouts);
    //  {_id: '6860f6057ecb2fcc67c2e245', type: 'chest', imageUrl: 'https://www.seannal.com/images/upper-chest.jpg', durationInMinutes: 100, exercises: Array(3), …}



    useEffect(() => {
        getAllMuscleWorkouts()
    }, [])


    return (
        <div className='bg-light' style={{ minHeight: "100vh" }}>

            <div className='d-flex'>
                <AdminSidePanel />

                <div className='w-100'>
                    <Link to={'/admin'} className='text-decoration-none ms-1'><i className="fa-solid fa-circle-chevron-left me-1"></i>Back</Link>
                    <h2 className='text-center'><i className="fa-solid fa-dumbbell me-2"></i>Muscle Groups</h2>
                    <hr />
                    <div style={{ marginTop: "30px" }} className='p-4 d-flex flex-wrap gap-4'>

                        {
                            allworkouts ?
                                (
                                    allworkouts.map((musclegroup) => (
                                        <Card key={musclegroup?._id} style={{ width: '10rem', height: '100%' }}>
                                            <Card.Img variant="top" src={musclegroup?.imageUrl} style={{ height: '150px', objectFit: 'cover' }} />
                                            <Card.Body>
                                                <Card.Title>{musclegroup?.type}</Card.Title>
                                                <Card.Text>Duration : {musclegroup?.durationInMinutes}Minutes </Card.Text>
                                                <Link to={`/allexercises/${musclegroup?._id}`} className='btn btn-outline-warning' variant="primary">customize</Link>
                                            </Card.Body>
                                        </Card>
                                    ))
                                )
                                :
                                (<h5>No Records...</h5>)
                        }

                    </div>

                </div>
            </div>



        </div>
    )
}

export default AllWorkouts