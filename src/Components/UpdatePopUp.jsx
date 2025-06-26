import React from 'react'
import styles from './Updatepopup.module.css'
import { ImCross } from 'react-icons/im'
import { useAuth } from '../contexts/AuthContext';


function UpdatePopUp({ reportName }) {
    const { showUpdatePopUp, setShowUpdatePopUp } = useAuth()


    return (
        <div className={`${styles.UpdatePopUp}`}>


            <div style={{ minWidth: "350px" }}>

                <button style={{ width: "35px" }} className='btn text-white' onClick={() => setShowUpdatePopUp(false)}>
                    <ImCross />
                </button>


                <div className='border rounded d-flex justify-content-center flex-column p-2'>


                    <h4 className='text-center text-white fw-bolder'>Report</h4>

                    {
                        reportName === "CALORIE INTAKE" ?
                            <div className='CALORIE-INTAKE'>

                                <form action="">
                                    <input type="text" placeholder='food name' className='form-control mb-3' />
                                    <input type="number" placeholder='quantity' className='form-control mb-3' />

                                    <select className='form-control mb-3' >
                                        <option disabled selected>select quantity unit</option>
                                        <option value="g">Gram</option>
                                        <option value="kg">KG</option>
                                        <option value="ml">Mili Litre</option>
                                        <option value="l">Litre</option>
                                    </select>


                                    <input type="time" className='form-control mb-3' />
                                    <input type="date" placeholder='Date of consume' className='form-control mb-3' />


                                    <button className='btn btn-success mb-3'>Update Report</button>
                                </form>

                            </div>
                        :
                        reportName === "SLEEP" ?
                            <div className='SLEEP'>

                                <form action="">

                                    <input type="number" placeholder='Hours slept?' className='form-control mb-3'/>
                                    <input type="date" className='form-control mb-3'/>

                                    <button className='btn btn-success mb-3'>Update Report</button>
                                </form>

                            </div>
                        :
                        reportName === "WATER INTAKE" ?
                            <div className='WATER INTAKE'>

                                <form action="">
                                    <input type="number" placeholder='water consumed in Litre' className='form-control mb-3' />
                                    <input type="date" placeholder='Date of consume' className='form-control mb-3' />

                                    <button className='btn btn-success mb-3'>Update Report</button>
                                </form>

                            </div>
                        :
                        reportName === "WEIGHT" ?
                            <div className='WEIGHT'>
                                <form action="">
                                    <input type="number" placeholder='weight' className='form-control mb-3' />
                                    <input type="date" placeholder='Date of consume' className='form-control mb-3' />

                                    <button className='btn btn-success mb-3'>Update Report</button>
                                </form>

                            </div>
                        :
                        reportName === "WORKOUTS" ?
                            <div className='WORKOUTS'>

                                <form action="">
                                    <input type="number" placeholder='number of workout done' className='form-control mb-3' />
                                    <input type="date" placeholder='Date of consume' className='form-control mb-3' />

                                    <button className='btn btn-success mb-3'>Update Report</button>
                                </form>

                            </div>
                        :
                        <h5 className='fw-bolder text-warning  text-center'>Coming Soon...</h5>

                    }



                </div>



            </div>





        </div>
    )
}

export default UpdatePopUp