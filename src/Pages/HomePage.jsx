import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProgressCard from '../Components/ProgressCard';
import DisplayBodyParts from '../Components/DisplayBodyParts';
import { useAuth } from '../contexts/AuthContext';
import VideoBanner from '../Components/VideoBanner';
import ImageBanner from '../Components/ImageBanner';
import Auth from '../Components/Auth';




function HomePage() {

    const { isUserLogged, setIsUserLogged } = useAuth();
    const { showPopUp, setShowPopUp } = useAuth()



    const [workout, setWorkout] = useState([])

    const getWorkout = () => {
        const temp = [{
            "type": "Chest",
            "imageUrl": "https://www.seannal.com/images/upper-chest.jpg"
        },
        {
            "type": "Triceps",
            "imageUrl": "https://cdn-wp.thesportsrush.com/2023/12/9327ad8e-cbum1.jpg?format=auto&w=3840&q=75"
        },
        {
            "type": "Shoulder",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBvO13-w4UL0Hj77d0mJi38-owvb82lS586CyTxIGxo2szhH3W68SVDzXFinPcxVOEoxg&usqp=CAU"
        },
        {
            "type": "Back",
            "imageUrl": "https://global.discourse-cdn.com/tnation/uploads/default/original/2X/7/7f77fc004645dfadc8e849ac324ce98623e2fa2b.jpg"
        },
        {
            "type": "Biceps",
            "imageUrl": "https://live.staticflickr.com/2448/4059857751_426fda93ee_w.jpg"
        },
        {
            "type": "Leg",
            "imageUrl": "https://thebodybuildingarchive.com/wp-content/uploads/2023/04/TomPlatz_PerfectForm.jpg"
        },
        {
            "type": "ABS",
            "imageUrl": "https://i.pinimg.com/474x/c4/df/35/c4df35aca0bec13d16319c19503dca78.jpg"
        }
        ]

        setWorkout(temp)
    }

    useEffect(() => {
        getWorkout();
    }, [])



    return (
        <div>


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

            <div>
                <h2 style={{ fontFamily: '"Press Start 2P", system-ui', marginTop: "100px", fontSize: "50px" }} className='text-center text-white' >
                    Workout
                </h2>
            </div>


            {

                isUserLogged ?
                <div>
                    <div className='container d-flex flex-wrap flex-column flex-md-row justify-content-center gap-3 align-items-center mt-5 mb-5'>
                        {/* BODY PARTS  */}

                        {workout.map((item, index) => (

                            <DisplayBodyParts key={index} item={item} />

                        ))
                        }

                    </div>
                  <hr className="w-100 border-top border-white" />


                    <ImageBanner/>
                </div>
                    :
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

            }



            {
                showPopUp && <Auth />
            }



        </div>
    )
}

export default HomePage