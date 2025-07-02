import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { CiSquarePlus } from 'react-icons/ci'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getExerciseByIdAPI } from '../services/userServices';

function WorkoutLogger() {
  const { id } = useParams();
  const [workouts, setWorkouts] = useState()


  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const getExercisesForWorkout = async (workoutId) => {
    try {

      const result = await getExerciseByIdAPI(workoutId)
      const exercisesData = result.data.response;
      console.log(exercisesData);
      
      setWorkouts(exercisesData)


    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    getExercisesForWorkout(id)
  }, [])




  return (
    <div style={{ paddingBottom: "160px",minHeight:"100vh"}}>
      <Header />

      <div className='d-flex justify-content-center align-items-center' style={{ fontFamily: '"Press Start 2P", system-ui', marginTop: "30px", fontSize: "35px" }}>

        {
          workouts?
            <h2 className='text-center text-white' >
              {workouts.type} Workout <span> {workouts.exercises.length} </span>
            </h2>
            :
            <h2 className='text-center text-white' >
              0 Workouts
            </h2>


        }
      </div>


      {
        workouts?
          workouts.exercises.map((item, index) => (
            <div className="container row" key={index} style={{ marginTop: "100px" }}>
              <div className="col-0 col-lg-1"> </div>
              <div className="workout-gif col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center">
                <img style={{ width: "60%", borderRadius: "18px" }} src={item.videoUrl} alt="video gif" />
              </div>
              <div className="workout-Logger col-12 col-md-6 col-lg-6 text-white d-flex flex-column justify-content-center">
                <h4>{item.exercise}</h4>
                <p className='sets-reps bg-warning text-dark w-25 text-center p-2 rounded shadow-sm '> {item.sets} Set x {item.reps} Reps</p>
                <p style={{ textAlign: "justify" }}>{item.description}</p>
              </div>
              <div className="col-0 col-md-1 col-lg-1"> </div>

            </div>
          ))
          :
          <div style={{ marginTop: "200px" }} className='p-4'>
            <h3 className='text-danger text-center fw-bolder'>Exercise Will Be Added Soon...</h3>
          </div>
      }


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>

          <h5 className='text-center mb-2'>Add Task</h5>

          <div>
            <FloatingLabel
              controlId="floatingInput"
              label="exercise name"
              className="mb-3"
            >
              <Form.Control type="string" placeholder="exercise name" />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="exercise gif link here"
              className="mb-3"
            >
              <Form.Control type="string" placeholder="exercise gif" />
            </FloatingLabel>

            <div className='d-flex gap-2'>
              <FloatingLabel
                controlId="floatingInput"
                label="Number of Sets"
                className="mb-3"
              >
                <Form.Control type="string" placeholder="number of sets" />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Number of Repetition"
                className="mb-3"
              >
                <Form.Control type="string" placeholder="number of reps" />
              </FloatingLabel>

            </div>

            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control
                as="textarea"
                placeholder="Leave a description here"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">ADD</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default WorkoutLogger