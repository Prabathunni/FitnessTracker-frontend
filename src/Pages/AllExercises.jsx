import React, { useEffect, useState } from 'react'
import AdminSidePanel from '../Components/AdminSidePanel'
import { Link, useParams } from 'react-router-dom'
import { addExerciseByWorkoutIdAPI, deleteAExerciseByIdSAPI, getAllExercisesByWorkoutIDAPI } from '../services/userServices';
import { Button, Card, ListGroup, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function AllExercises() {

    // Modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { workoutId } = useParams();
    const [allexercises, setAllExercises] = useState()


    const [exerciseName, setExerciseName] = useState("")
    const [gifLink, setGifLink] = useState("")
    const [description, setDescription] = useState("")
    const [sets, setSets] = useState(0)
    const [reps, setrReps] = useState(0)
    const [rest, setRest] = useState(0)


    const addExercise = async () => {
        if (!exerciseName || !gifLink || !description || !sets || !reps || !rest) {
            alert("Provide All inputs...")
        }

        const newData = {
            exercise: exerciseName,
            videoUrl: gifLink,
            description,
            sets,
            reps,
            rest
        }

        try {
            const result = await addExerciseByWorkoutIdAPI(workoutId, newData)
            console.log(result);
            alert(result.data.response)
            handleClose()
            getAllExercises()

            setExerciseName("");
            setGifLink("");
            setDescription("");
            setSets(0);
            setrReps(0);
            setRest(0);


        } catch (error) {
            console.log(error);

        }

    }

    const deleteExercise = async (exerciseId) => {

        const confirmation = window.confirm("Proceed to remove exercise")

        if (confirmation) {
            try {
                const result = await deleteAExerciseByIdSAPI(workoutId, exerciseId)
                alert(result.data.response)
                getAllExercises()
            } catch (error) {
                console.log(error);

            }
        }


    }

    const getAllExercises = async () => {
        try {
            const result = await getAllExercisesByWorkoutIDAPI(workoutId)
            setAllExercises(result.data.response)

        } catch (error) {
            console.log(error);
            if (error.status === 404) {
                alert(error.response.data.response)
            }

        }
    }



    useEffect(() => {
        getAllExercises()
    }, [])

    return (
        <div className='bg-light' style={{ minHeight: "100vh" }}>

            <div className='d-flex'>
                <AdminSidePanel />

                <div className='w-100'>
                    <Link to={'/allworkouts'} className='text-decoration-none ms-1'><i className="fa-solid fa-circle-chevron-left me-1"></i>Back</Link>
                    <h2 className='text-center'><i className="fa-solid fa-dumbbell me-2"></i>Workouts</h2>
                    <button className='btn text-success ms-3' onClick={handleShow}>Add exercise <i class="fa-solid fa-plus ms-2"></i></button>
                    <hr />

                    <div style={{ marginTop: "30px" }} className='p-4 d-flex flex-wrap gap-4'>
                        {allexercises ?
                            (allexercises.map((exercise) => (
                                <Card key={exercise?._id} style={{ width: '16rem' }} className="shadow-sm">
                                    <Card.Img
                                        variant="top"
                                        src={exercise?.videoUrl}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '1rem' }}>
                                            {exercise?.exercise}
                                        </Card.Title>
                                        <Card.Text style={{ fontSize: '0.85rem', maxHeight: '80px', overflowY: 'auto' }}>
                                            {exercise?.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Sets: {exercise?.sets}</ListGroup.Item>
                                        <ListGroup.Item>Reps: {exercise?.reps}</ListGroup.Item>
                                        <ListGroup.Item>Rest: {exercise?.rest}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body className="d-flex justify-content-between">
                                        <Button size="sm" variant="primary">
                                            Edit <i className="fa-solid fa-pen-to-square ms-1"></i>
                                        </Button>
                                        <Button size="sm" variant="danger" onClick={() => deleteExercise(exercise?._id)}>
                                            Delete <i className="fa-solid fa-trash ms-1"></i>
                                        </Button>
                                    </Card.Body>
                                </Card>)))
                            :
                            (<h3>No Records...</h3>)

                        }
                    </div>

                </div>
            </div>




            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Exercise</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <input type="text" onChange={e => setExerciseName(e.target.value)} placeholder='Exercise Name' className='form-control mb-3' required />
                    <input type="text" onChange={e => setGifLink(e.target.value)} placeholder='Exercise Gif Link' className='form-control mb-3' required />
                    <textarea placeholder='Exercise description' onChange={e => setDescription(e.target.value)} rows={3} className='form-control mb-3' required></textarea>

                    <div className='d-flex gap-3'>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id='sets_id'> Sets</InputGroup.Text>
                            <Form.Control
                                type='number' onChange={e => setSets(e.target.value)}
                                placeholder="sets"
                                aria-label="sets"
                                aria-describedby='sets_id' required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id='reps_id'> Reps</InputGroup.Text>
                            <Form.Control
                                type='number' onChange={e => setrReps(e.target.value)}
                                placeholder="reps"
                                aria-label="reps"
                                aria-describedby='reps_id' required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id='rest_id'> rest</InputGroup.Text>
                            <Form.Control
                                type='number' onChange={e => setRest(e.target.value)}
                                placeholder="rest"
                                aria-label="rest"
                                aria-describedby='rest_id' required
                            />
                        </InputGroup>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={addExercise}>Add</Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}

export default AllExercises