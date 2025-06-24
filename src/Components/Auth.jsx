import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Auth.module.css'
import logo from '/heart-rate.png'
import { ImCross } from 'react-icons/im'
import { useAuth } from '../contexts/AuthContext'
import { loginAPI, registerAPI } from '../services/userServices'


function Auth() {


  const { showPopUp, setShowPopUp } = useAuth()
  const { isUserLogged, setIsUserLogged } = useAuth()


  const [isRegister, setIsRegister] = useState(true)


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState(null)
  const [weightInKg, setWeightInKg] = useState(null)
  const [heightInCm, setHeightInCm] = useState(null)
  const [gender, setGender] = useState('')
  const [activityLevel, setActivityLevel] = useState('')
  const [goal, setGoal] = useState('')


  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setAge('');
    setWeightInKg('');
    setHeightInCm('');
    setGender('');
    setActivityLevel('');
    setGoal('');
  };


  const registerUser = async (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
      age: Number(age),
      goal,
      activityLevel,
      weightInKg: Number(weightInKg),
      heightInCm: Number(heightInCm),
      gender
    }

    try {

      const res = await registerAPI(userData)
      console.log(res);
      setIsRegister(false)
      alert("Registered  successfully...")
      resetForm()



    } catch (error) {

      console.log(error);
      alert(error.response.data)


    }



  }


  // ------login user
  const loginUser = async (e) => {
    e.preventDefault()

    const credentials = {
      email,
      password
    }

    try {

      const result = await loginAPI(credentials)

      if (result) {
        resetForm()
        setIsUserLogged(true)
        setShowPopUp(false)
        alert("login successfull")
      }else{
        alert("Login Failed")
      }



    } catch (error) {
      alert(error.response.data)

    }



  }


  return (
    <div className={styles.login}>

      {
        isRegister ?
          <>
            <div className={`${styles.authdiv} d-flex flex-column`}>

              <div className='text-end'>
                <button style={{ width: "35px" }} className='btn text-white' onClick={() => setShowPopUp(false)}>
                  <ImCross />
                </button>


              </div>


              <div className={`row border rounded`}>

                <div className='col-lg-6 d-none d-lg-flex justify-content-center align-items-center bg-primary opacity-75 border rounded'>

                  <a className='d-flex justify-content-center p-2 text-white rounded mb-5 text-decoration-none' style={{ cursor: "pointer" }} >
                    <img src={logo} style={{ width: "30px", height: "30px" }} alt="logo" />
                    <h4 >Fitness Tracker</h4>
                  </a>


                </div>


                <div className={`col-lg-6 p-5 rounded`}>

                  <h4 className='fw-bolder text-center mb-3 text-white'>Register</h4>

                  <div className="form-wrapper">
                    <form onSubmit={registerUser}>

                      <input type="text" placeholder="Enter your username" value={name} onChange={e => setName(e.target.value)} className="form-control mb-3" required />
                      <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-3" required />
                      <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="form-control mb-3" required />
                      <input type="number" placeholder="Enter your age" value={age} onChange={e => setAge(e.target.value)} className="form-control mb-3" min="1" required />

                      <div className='d-flex gap-2'>
                        <input type="number" placeholder="weight in kg" value={weightInKg} onChange={e => setWeightInKg(e.target.value)} className="form-control mb-3" min="1" required />
                        <input type="number" placeholder="height in cm" value={heightInCm} onChange={e => setHeightInCm(e.target.value)} className="form-control mb-3" min="1" required />
                      </div>

                      <select className="form-control mb-3" value={gender} onChange={e => setGender(e.target.value)} required>
                        <option value="" disabled selected>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>


                      <select className="form-control mb-3" value={activityLevel} onChange={e => setActivityLevel(e.target.value)} required>
                        <option value="" disabled selected>Activity level</option>
                        <option value="notActive">not Active</option>
                        <option value="moderate">moderate</option>
                        <option value="intense">Intense</option>
                      </select>

                      <select className="form-control mb-3" value={goal} onChange={e => setGoal(e.target.value)} required>
                        <option value="" disabled selected>Goal</option>
                        <option value="weightGain">Weight Gain</option>
                        <option value="weightLoss">Weight Loss</option>
                        <option value="maintainWeight">Maintain weight</option>
                      </select>


                      <input type="submit" value="Register" className="btn btn-success w-100 mb-3" />

                    </form>


                  </div>
                  <p style={{ fontSize: "13px" }} className='fw-bolder text-white'>Already Have An Acount? <a className='text-primary' onClick={() => setIsRegister(false)} style={{ cursor: "pointer" }}>Click here</a> to Login </p>

                </div>

              </div>


            </div>


          </>
          :
          <>

            <div className={`${styles.authdiv} d-flex flex-column`}>

              <div className='text-end'>
                <button style={{ width: "35px" }} className='btn text-white' onClick={() => setShowPopUp(false)}>
                  <ImCross />
                </button>


              </div>

              <div className={`row border rounded`}>

                <div className='col-lg-6 d-none d-lg-flex justify-content-center align-items-center bg-primary opacity-75 border rounded'>

                  <a className='d-flex justify-content-center p-2 text-white rounded mb-5 text-decoration-none' style={{ cursor: "pointer" }} >
                    <img src={logo} style={{ width: "30px", height: "30px" }} alt="logo" />
                    <h4 >Fitness Tracker</h4>
                  </a>


                </div>


                <div className='col-lg-6 p-5 rounded'>

                  <h4 className='fw-bolder text-center mb-3 text-white'>Login</h4>
                  <form onSubmit={loginUser}>

                    <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} class="form-control mb-3" required />
                    <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} class="form-control mb-3" required />

                    <input type="submit" value="Login" class="btn btn-success w-100 mb-3" />

                  </form>
                  <p style={{ fontSize: "13px" }} className='fw-bolder text-white'>Don't Have An Acount? <a className='text-primary' onClick={() => setIsRegister(true)} style={{ cursor: "pointer" }}>Click here</a> to Register </p>

                </div>

              </div>

            </div>

          </>
      }



    </div>
  )
}

export default Auth