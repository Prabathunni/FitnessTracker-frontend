import React, { useEffect, useState } from 'react'
import AdminSidePanel from '../Components/AdminSidePanel'
import { Link, useParams } from 'react-router-dom'
import { addExerciseByWorkoutIdAPI, deleteAExerciseByIdSAPI, getAllExercisesByWorkoutIDAPI, updateAExerciseAPI } from '../services/userServices';
import { Button, Card, ListGroup, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast, ToastContainer } from 'react-toastify';


function AllExercises() {

    // Modals
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setEditId(null)
        setExerciseName("")
        setGifLink("")
        setDescription("")
        setSets(0)
        setReps(0)
        setRest(0)

    }
    const handleShow = () => setShow(true);

    const { workoutId } = useParams();
    const [allexercises, setAllExercises] = useState()


    const [exerciseName, setExerciseName] = useState("")
    const [gifLink, setGifLink] = useState("")
    const [description, setDescription] = useState("")
    const [sets, setSets] = useState(0)
    const [reps, setReps] = useState(0)
    const [rest, setRest] = useState(0)
    const [editId, setEditId] = useState(null)

    const editExercise = (exercise) => {
        setEditId(exercise._id)
        setExerciseName(exercise.exercise)
        setGifLink(exercise.videoUrl)
        setDescription(exercise.description)
        setSets(exercise.sets)
        setReps(exercise.reps)
        setRest(exercise.rest)
        handleShow()

    }


    const updateExercise = async () => {

        const updateDate = {
            exercise: exerciseName,
            videoUrl: gifLink,
            description,
            sets,
            reps,
            rest
        }

        try {

            const result = await updateAExerciseAPI(workoutId, editId, updateDate)
            toast.success(result.data.response);
            handleClose()


        } catch (error) {
            console.log(error);
            if (error.status === 404) {
                toast.error(error.response.data.response)
            }
            handleClose()

        }

    }


    const addExercise = async () => {
        if (!exerciseName || !gifLink || !description || !sets || !reps || !rest) {
            toast.warning("Provide All inputs...")
            return;
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
            // console.log(result);
            toast.success(result.data.response)
            handleClose()
            setTimeout(() => {
                getAllExercises()
            }, 2000);

        } catch (error) {
            console.log(error);
            handleClose()

        }

    }

    const deleteExercise = async (exerciseId) => {

        const confirmation = window.confirm("Proceed to remove exercise")

        if (confirmation) {
            try {
                const result = await deleteAExerciseByIdSAPI(workoutId, exerciseId)
                toast.warning(result.data.response)
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
                toast.error(error.response.data.response)
                return
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
                                        <Button size="sm" variant="primary" onClick={() => editExercise(exercise)}>
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

                    <input type="text" value={exerciseName} onChange={e => setExerciseName(e.target.value)} placeholder='Exercise Name' className='form-control mb-3' required />
                    <input type="text" value={gifLink} onChange={e => setGifLink(e.target.value)} placeholder='Exercise Gif Link' className='form-control mb-3' required />
                    <textarea placeholder='Exercise description' value={description} onChange={e => setDescription(e.target.value)} rows={3} className='form-control mb-3' required></textarea>

                    <div className='d-flex gap-3'>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id='sets_id'> Sets</InputGroup.Text>
                            <Form.Control
                                type='number' onChange={e => setSets(e.target.value)}
                                placeholder="sets" value={sets}
                                aria-label="sets"
                                aria-describedby='sets_id' required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id='reps_id'> Reps</InputGroup.Text>
                            <Form.Control
                                type='number' onChange={e => setReps(e.target.value)}
                                placeholder="reps" value={reps}
                                aria-label="reps"
                                aria-describedby='reps_id' required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id='rest_id'> rest</InputGroup.Text>
                            <Form.Control
                                type='number' onChange={e => setRest(e.target.value)}
                                placeholder="rest" value={rest}
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
                    <Button variant="success" onClick={editId ? updateExercise : addExercise}>{editId ? "Update" : "Add"}</Button>
                </Modal.Footer>
            </Modal>



            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />




        </div>
    )
}

export default AllExercises