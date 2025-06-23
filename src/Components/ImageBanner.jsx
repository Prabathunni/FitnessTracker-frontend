import React from 'react'
import image1 from '../assets/images/homeimg1.jpg'
import image2 from '../assets/images/himage2.jpg'
import image3 from '../assets/images/himage3.jpg'

function ImageBanner() {


  return (
    <>

      <div className="row d-flex align-items-center p-5">

        <div className="col-12 col-lg-6 hometext p-3">
          <h3 className='mb-1 text-warning'>BEST ON FITNESS & WELLNESS</h3>
          <h3 className='fw-bolder text-light'>Welcome to Your Personal Fitness Journey
            Stay Motivated, Stay Strong, Stay Consistent.</h3>

        </div>
        <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center gap-1 ">
          <img src={image3} alt="" style={{ width: '225px' }} className='rounded shadow' />
          <img src={image1} alt="" style={{ width: '250px' }} className='rounded shadow' />
          <img src={image2} alt="" style={{ width: '275px' }} className='rounded shadow' />
        </div>

        <div className="col-12 col-lg-11 hometext text-end mt-5 p-3">
          <h3 className="mb-1 text-success">YOUR DAILY FITNESS COMPANION</h3>
          <h3 className="fw-bolder text-light">
            Transform Your Body and Mind<br />
            One Workout at a Time. Track Progress, Build Discipline, Feel the Change.
          </h3>
        </div>

        <hr className="w-100 border-top border-white" />

      </div>


      <div className="row">

        <div className='hometext col-12 col-lg-6 bg-warning'>
          <h5 className='mt-2 ms-3 mb-0'>Features</h5>

          <dl>
            <dt>Workout Logging</dt>
            <dd>Track your daily workouts, sets, reps, and rest time.</dd>

            <dt>Progress Analytics</dt>
            <dd>Monitor graphs on the basis of calories intake</dd>

            <dt>Goal Setting</dt>
            <dd>Set your Goals and track your progress</dd>

            <dt>Workout Guide and more</dt>
            <dd>Workout tutorials, basic instruction on workout and add more workout upload options</dd>
          </dl>

        </div>

        <div className="poweredBy col-12 col-lg-6 bg-dark text-light hometext d-flex align-items-center justify-content-center">

          <h6 className='mt-2 ms-3'>Powered by</h6>

          <div className='text-white'>

            <img style={{ width: "30px", height: "30px" }} className='ms-2' src="https://images.icon-icons.com/2415/PNG/512/mongodb_original_logo_icon_146424.png" alt="" />
            <img style={{ width: "30px", height: "30px" }} className='ms-2' src="https://img.icons8.com/nolan/512/express-js.png" alt="" />
            <i className="fa-brands fa-react fa-xl text-primary ms-2"></i>
            <i className="fa-brands fa-node fa-xl ms-2 text-warning"></i>



          </div>

        </div>

      <hr className="w-100 border-top border-white" />
      
      </div>





    </>
  )
}

export default ImageBanner