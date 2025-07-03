import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProgressCard from '../Components/ProgressCard';
import DisplayBodyParts from '../Components/DisplayBodyParts';
import { useAuth } from '../contexts/AuthContext';
import VideoBanner from '../Components/VideoBanner';
import ImageBanner from '../Components/ImageBanner';
import Auth from '../Components/Auth';
import { getAllWorkoutsAPI } from '../services/userServices';

// const muscleGroupData = await getAllMuscleAPI()
// const datas = muscleGroupData.data
// if(datas){
//     setWorkout(datas)
// }



function HomePage() {

    const { isUserLogged } = useAuth();
    const { showPopUp, setShowPopUp } = useAuth()

    const [workout, setWorkout] = useState([])


    const getAllMuscleGroup = async () => {
        if (isUserLogged) {
            try {
                const result = await getAllWorkoutsAPI()
                const muscleData = result.data.response;
                // console.log(muscleData);
                setWorkout(muscleData)

            } catch (error) {
                console.log(error);
            }

        }
    }


    useEffect(() => {


        getAllMuscleGroup()

    }, [])


    return (
        <div style={{ paddingBottom: "150px" }}>


            {
                isUserLogged ?
                    <div>

                        <Header />
                        <ProgressCard />

                    </div>
                    :
                    <div>

                        <VideoBanner />
                        <ImageBanner />

                    </div>
            }



            {

                isUserLogged ?
                    <div>
                        <div>
                            <h2 style={{ fontFamily: '"Press Start 2P", system-ui', marginTop: "100px", fontSize: "50px" }} className='text-center text-white' >
                                Muscle Groups
                            </h2>
                        </div>

                        <div className='container d-flex flex-wrap flex-column flex-md-row justify-content-center gap-3 align-items-center mt-5 mb-5'>
                            {/* BODY PARTS  */}

                            {
                                workout.length > 0 ?
                                    workout.map((item, index) => (

                                        <DisplayBodyParts key={index} item={item} />

                                    )) :
                                    <h4 className='text-danger'> MucleGroups will be added soon... </h4>
                            }

                        </div>
                        <hr className="w-100 border-top border-white" />


                        <ImageBanner />
                    </div>
                    :

                    <div className='text-center'>

                        <button className='mt-4 btn btn-primary' onClick={() => setShowPopUp(true)}>
                            Get Started
                            <svg width="16" height="16" className='ms-1' fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 2l6 6-6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                            </svg>
                        </button>


                        <div>
                            <h2 style={{ fontFamily: '"Press Start 2P", system-ui', marginTop: "100px", fontSize: "50px" }} className='text-center text-white' >
                                Workout
                            </h2>
                        </div>




                        <div className='container d-flex flex-wrap flex-column flex-md-row gap-3 mt-5 text-white'>

                            <div className="MuscleCard" style={{ backgroundImage: `url(https://www.seannal.com/images/upper-chest.jpg)` }}>
                                <h5 className='hometext'>Chest</h5>
                            </div>

                            <div className="MuscleCard" style={{ backgroundImage: `url(https://cdn-wp.thesportsrush.com/2023/12/9327ad8e-cbum1.jpg?format=auto&w=3840&q=75)` }}>
                                <h5 className='hometext'>Triceps</h5>
                            </div>

                            <div className="MuscleCard" style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBvO13-w4UL0Hj77d0mJi38-owvb82lS586CyTxIGxo2szhH3W68SVDzXFinPcxVOEoxg&usqp=CAU)` }}>
                                <h5 className='hometext'>Shoulder</h5>
                            </div>

                            <div className="MuscleCard" style={{ backgroundImage: `url(https://global.discourse-cdn.com/tnation/uploads/default/original/2X/7/7f77fc004645dfadc8e849ac324ce98623e2fa2b.jpg)` }}>
                                <h5 className='hometext'>Back</h5>
                            </div>

                            <div className="MuscleCard" style={{ backgroundImage: `url(https://live.staticflickr.com/2448/4059857751_426fda93ee_w.jpg)` }}>
                                <h5 className='hometext'>Biceps</h5>
                            </div>

                            <div className="MuscleCard" style={{ backgroundImage: `url(https://thebodybuildingarchive.com/wp-content/uploads/2023/04/TomPlatz_PerfectForm.jpg)` }}>
                                <h5 className='hometext'>Leg</h5>
                            </div>

                            <div className="MuscleCard" style={{ backgroundImage: `url(https://i.pinimg.com/474x/c4/df/35/c4df35aca0bec13d16319c19503dca78.jpg)` }}>
                                <h5 className='hometext'>ABS</h5>
                            </div>


                        </div>


                    </div>


            }



            {
                showPopUp && <Auth />
            }



        </div>
    )
}

export default HomePage