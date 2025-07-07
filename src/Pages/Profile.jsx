import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { getUserDetailsAPI, updateUserAPI } from '../services/userServices';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Profile() {

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);


  const [name, setName] = useState()
  // const [email,setEmail] =useState()
  const [age, setAge] = useState()
  const [goal, setGoal] = useState()
  const [activityLevel, setActivityLevel] = useState()
  const [gender, setGender] = useState()


  const handleEdit = () => {
    setAge(age)
    setGoal(goal)
    setActivityLevel(activityLevel)
    setGender(gender)
    handleShow()
  }

  const updateUser = async () => {

    const updatedData = {
      age,
      goal,
      activityLevel,
      gender
    }

    // console.log(updatedData);


    try {

      const result = await updateUserAPI(updatedData)
      console.log(result.data);
      toast.success(result?.data.message)
      userDetailsFetch()
      handleClose()

    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  }




  const userDetailsFetch = async () => {
    try {
      const result = await getUserDetailsAPI()
      // console.log(result.data);
      setName(result?.data.name)
      // setEmail(result.data.email)
      setAge(result?.data.age)
      setGoal(result?.data.goal)
      setGender(result.data.gender)
      setActivityLevel(result?.data.activityLevel)

    } catch (error) {
      console.log(error);

    }
  }





  useEffect(() => {
    userDetailsFetch()
  }, [])


  return (
    <div >
      <Header />
      <div className='vh-100 d-flex justify-content-center align-items-center'>

        <div className="card shadow rounded-4 bg-light text-dark" style={{ minWidth: '320px', maxWidth: '400px' }}>
          <div className="card-body p-4 text-center">

            {/* 👤 Small Rounded Avatar */}
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              alt="user avatar"
              className="rounded-circle shadow mb-3"
              width="80"
              height="80"
            />

            <h3 className="card-title mb-3 fw-bold">{name}</h3>
            <hr />

            <p className="mb-2">
              Age:
              <span className="badge bg-warning text-dark fw-semibold ms-2 px-3 py-2 shadow-sm">{age}</span>
            </p>

            <p className="mb-2">
              Gender:
              <span className="badge bg-warning text-dark fw-semibold ms-2 px-3 py-2 shadow-sm">{gender}</span>
            </p>

            <p className="mb-2">
              Goal:
              <span className="badge bg-warning text-dark fw-semibold ms-2 px-3 py-2 shadow-sm">{goal}</span>
            </p>

            <p className="mb-3">
              Activity Level:
              <span className="badge bg-warning text-dark fw-semibold ms-2 px-3 py-2 shadow-sm">{activityLevel}</span>
            </p>

            <div className="d-grid mt-4">
              <button onClick={handleEdit} className="btn btn-outline-success fw-semibold">
                Update
              </button>
            </div>

          </div>
        </div>

      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='md'
      >
        <Modal.Body>

          <h5 className='text-center mb-2'>Profile Details</h5>

          <div >

            <label >Age :</label>
            <input type="number" placeholder="Enter your age" value={age} onChange={e => setAge(e.target.value)} className="form-control mb-3" min="1" required />

            <label htmlFor="">Gender :</label>
            <select className="form-control mb-3" value={gender} onChange={e => setGender(e.target.value)} required>
              <option value="" disabled selected>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="">Goal :</label>
            <select className="form-control mb-3" value={goal} onChange={e => setGoal(e.target.value)} required>
              <option value="" disabled selected>Goal</option>
              <option value="weightGain">Weight Gain</option>
              <option value="weightLoss">Weight Loss</option>
              <option value="maintainWeight">Maintain weight</option>
            </select>

            <label htmlFor="">Activity Level :</label>
            <select className="form-control mb-3" value={activityLevel} onChange={e => setActivityLevel(e.target.value)} required>
              <option value="sedentary">Sedentary — no regular exercise</option>
              <option value="light">Light — 1-3 days/week</option>
              <option value="moderate">Moderate — 3-5 days/week</option>
              <option value="active">Active — 6-7 days/week</option>
              <option value="very_active">Very Active — twice a day or physical job</option>
            </select>


          </div>

          <div className='d-flex justify-content-center gap-2 mt-5'>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <Button onClick={updateUser}>Update</Button>


          </div>


        </Modal.Body>
      </Modal>



    </div>
  )
}

export default Profile