import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { CiSquarePlus } from 'react-icons/ci'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

function WorkoutLogger() {

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [workout, setWorkout] = useState({
    type: "",
    imageUrl: "",
    durationtime: 0,
    exercises: [],
  })

  const getWorkout = () => {

    const data = {
      type: "Chest",
      imageUrl: "https://www.seannal.com/images/upper-chest.jpg",
      durationtime: 60,
      exercises: [
        {
          exercise: "Bench Press",
          videoUrl: 'https://media.tenor.com/0hoNLcggDG0AAAAM/bench-press.gif',
          sets: 3,
          reps: 15,
          rest: 60,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nihil sequi commodi perspiciatis itaque id molestias tenetur, possimus vel, omnis, tempora atque dolores minima recusandae? Ex ea veniam quisquam quibusdam!"
        },
        {
          exercise: "Incline Bench Press",
          videoUrl: 'https://149874912.v2.pressablecdn.com/wp-content/uploads/2020/03/Incline-Bench-Press.gif',
          sets: 3,
          reps: 15,
          rest: 60,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nihil sequi commodi perspiciatis itaque id molestias tenetur, possimus vel, omnis, tempora atque dolores minima recusandae? Ex ea veniam quisquam quibusdam!"

        },
        {
          exercise: "Decline Cable Press",
          videoUrl: 'https://gymvisual.com/img/p/2/5/6/3/1/25631.gif',
          sets: 3,
          reps: 15,
          rest: 60,
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nihil sequi commodi perspiciatis itaque id molestias tenetur, possimus vel, omnis, tempora atque dolores minima recusandae? Ex ea veniam quisquam quibusdam!"

        }
      ]

    }



    setWorkout(data)

  }

  useEffect(() => {
    getWorkout();
  }, [])



  
  



  // {
  //   type: "Triceps",
  //   imageUrl: "https://cdn-wp.thesportsrush.com/2023/12/9327ad8e-cbum1.jpg?format=auto&w=3840&q=75",
  //   durationtime: 60,
  //   exercises: [
  //     {
  //       exercise: "Skull Crush",
  //       videoUrl: 'https://media.tenor.com/-Pq0I_p6kG0AAAAM/skulls.gif',
  //       sets: 3,
  //       reps: 15,
  //       rest: 60,
  //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nihil sequi commodi perspiciatis itaque id molestias tenetur, possimus vel, omnis, tempora atque dolores minima recusandae? Ex ea veniam quisquam quibusdam!"
  //     },
  //     {
  //       exercise: "Overhead cable Extension",
  //       videoUrl: 'https://musclemagfitness.com/wp-content/uploads/overhead-rope-tricep-extension-exercise.gif',
  //       sets: 3,
  //       reps: 15,
  //       rest: 60,
  //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nihil sequi commodi perspiciatis itaque id molestias tenetur, possimus vel, omnis, tempora atque dolores minima recusandae? Ex ea veniam quisquam quibusdam!"

  //     },
  //     {
  //       exercise: "Cable Pushdown",
  //       videoUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown.gif',
  //       sets: 3,
  //       reps: 15,
  //       rest: 60,
  //       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nihil sequi commodi perspiciatis itaque id molestias tenetur, possimus vel, omnis, tempora atque dolores minima recusandae? Ex ea veniam quisquam quibusdam!"

  //     }
  // ]

  // }





  return (
    <div>
      <Header />

      <div className='d-flex justify-content-center align-items-center' style={{ fontFamily: '"Press Start 2P", system-ui', marginTop: "30px", fontSize: "35px" }}>

        <h2 className='text-center text-white' >
          {workout.type} Workout <span> {workout.exercises.length} </span> 
        </h2>
      </div>

      <div className='container text-end'>
        <Button variant="primary" onClick={handleShow}>
          Add Exercise  <i class="fa-solid fa-plus ms-2"></i>
        </Button>
      </div>


      {
        workout.exercises.map((item, index) => (
          <div className="container row" key={index} style={{ marginTop: "100px" }}>
            <div className="col-0 col-lg-1"> </div>
            <div className="workout-gif col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center">
              <img style={{ width: "60%", borderRadius: "18px" }} src={item.videoUrl} alt="video gif" />
            </div>
            <div className="workout-Logger col-12 col-md-6 col-lg-6 text-white d-flex flex-column justify-content-center">
              <h4>{item.exercise}</h4>
              <p className='sets-reps bg-warning text-dark w-25 text-center p-2 rounded shadow-sm '> {item.sets} Set x {item.reps} Reps</p>
              <p style={{ textAlign: "justify" }}>{item.description}</p>
              <div className="text-end">
                <button className='btn btn-outline-danger text-white'>Delete Exercise <i class="fa-solid fa-trash text-white fa-lg"></i></button>
              </div>
            </div>
            <div className="col-0 col-md-1 col-lg-1"> </div>

          </div>
        ))

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