import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { getUserDetailsAPI } from '../services/userServices';

function Profile() {


  // activityLevel
  // :
  // "moderate"
  // age
  // :
  // 24
  // email
  // :
  // "sethu@mail"
  // gender
  // :
  // "male"
  // goal
  // :
  // "weightGain"
  // height
  // :
  // [{… }]
  // name
  // :
  // "sethu"

  const [name,setName] =useState()
  // const [email,setEmail] =useState()
  const [age,setAge] =useState()
  const [goal,setGoal] =useState()
  const [activityLevel,setActivityLevel] =useState()
  const [gender,setGender] =useState()




    const userDetailsFetch = async () => {
      try {
        const result = await getUserDetailsAPI()
        console.log(result.data);
        setName(result.data.name)
        // setEmail(result.data.email)
        setAge(result.data.age)
        setGoal(result.data.goal)
        setGender(result.data.gender)
        setActivityLevel(result.data.activityLevel)
        
      } catch (error) {
        console.log(error);
        
      }
    }
  
    
  
  
  
    useEffect(()=>{
      userDetailsFetch()
    },[])
  

  return (
    <div >
      <Header />
      <div className='vh-100 d-flex justify-content-center align-items-center'>

        <div className='text-dark bg-light w-25 p-5 rounded shadow' style={{minHeight:"300px"}}>
          {/* <img width="240" height="240" className='rounded' src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?uid=R188092662&ga=GA1.1.372816841.1746347166&semt=ais_hybrid&w=740" alt="user" />
          <hr /> */}
          <h3 className=''>{name}</h3>
          <hr />
          <p >Age: <span className='fw-bolder bg-warning text-dark p-1 rounded shadow-sm px-3 ms-2'>{age}</span></p>
          <p >Gender: <span className='fw-bolder bg-warning text-dark p-1 rounded shadow-sm px-3 ms-2'>{gender}</span></p>
          <p >Goal: <span className='fw-bolder bg-warning text-dark p-1 rounded shadow-sm px-3 ms-2'>{goal}</span></p>
          <p >Activity Level: <span className='fw-bolder bg-warning text-dark p-1 rounded shadow-sm px-3 ms-2'>{activityLevel}</span></p>
          {/* <hr /> */}
          {/* <div className='d-flex gap-3 justify-content-center'>

            <p>Weight : <span className='fw-bolder bg-light text-danger p-2 rounded'>55 KG</span> </p>
            <p>Height : <span  className='fw-bolder bg-light text-danger p-2 rounded'>170 cm</span></p>


          </div> */}

          {/* <hr /> */}
          {/* <button className='btn btn-outline-light'>Update</button> */}


        </div>

      </div>
    </div>
  )
}

export default Profile