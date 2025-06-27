import React, { useState } from 'react'
import styles from './Updatepopup.module.css'
import { ImCross } from 'react-icons/im'
import { useAuth } from '../contexts/AuthContext';


function UpdatePopUp({ reportName }) {
    const {setShowUpdatePopUp } = useAuth()

    const [showTargetField, setShowTargetField] = useState(false)


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
                                    <input type="text" placeholder='food item name' className='form-control mb-3' />
                                    <input type="number" placeholder='quantity' className='form-control mb-3' />

                                    <select className='form-control mb-3' >
                                        <option disabled selected>select quantity unit</option>
                                        <option value="g">Gram</option>
                                        <option value="kg">KG</option>
                                        <option value="ml">Mili Litre</option>
                                        <option value="l">Litre</option>
                                    </select>

                                    <input type="datetime-local" placeholder='Date of consume' className='form-control mb-3' />

                                    <button className='btn btn-success mb-3 form-control'>Update Report</button>
                                </form>

                                <button className='btn btn-danger form-control mb-3' onClick={() => setShowTargetField(true)} >Set Goal</button>

                                {
                                    showTargetField &&
                                    <div className='d-flex gap-2'>
                                        <button className='btn btn-danger'>Save</button>
                                        <input type="number" className='form-control' placeholder='Target Calorie in KCal' />
                                    </div>
                                }

                            </div>
                            :
                            reportName === "SLEEP" ?
                                <div className='SLEEP'>

                                    <form action="">

                                        <input type="number" placeholder='Hours slept?' className='form-control mb-3' />
                                        <input type="date" className='form-control mb-3' />

                                        <button className='btn btn-success form-control mb-3'>Update Report</button>
                                    </form>

                                    <button className='btn btn-danger form-control mb-3' onClick={() => setShowTargetField(true)} >Set Target</button>

                                    {
                                        showTargetField &&
                                        <div className='d-flex gap-2'>
                                            <button className='btn btn-danger'>Save</button>
                                            <input type="text" className='form-control' placeholder='Sleep in hrs(8-9 hrs prefers  )' />
                                        </div>
                                    }


                                </div>
                                :
                                reportName === "WATER INTAKE" ?
                                    <div className='WATER INTAKE'>

                                        <form action="">
                                            <input type="number" placeholder='water consumed in Litre' className='form-control mb-3' />
                                            <input type="date" placeholder='Date of consume' className='form-control mb-3' />

                                            <button className='btn btn-success form-control mb-3'>Update Report</button>
                                        </form>

                                        <button className='btn btn-danger form-control mb-3' onClick={() => setShowTargetField(true)} >Set Target</button>

                                        {
                                            showTargetField &&
                                            <div className='d-flex gap-2'>
                                                <button className='btn btn-danger'>Save</button>
                                                <input type="text" className='form-control' placeholder='Water Intake in Litre' />
                                            </div>
                                        }


                                    </div>
                                    :
                                    reportName === "WEIGHT" ?
                                        <div className='WEIGHT'>
                                            <form action="">
                                                <input type="number" placeholder='weight' className='form-control mb-3' />
                                                <input type="date" placeholder='Date of consume' className='form-control mb-3' />

                                                <button className='btn btn-success form-control mb-3'>Update Report</button>
                                            </form>

                                            <button className='btn btn-danger form-control mb-3' onClick={() => setShowTargetField(true)} >Set Target</button>

                                            {
                                                showTargetField &&
                                                <div className='d-flex gap-2'>
                                                    <button className='btn btn-danger'>Save</button>
                                                    <input type="text" className='form-control' placeholder='Target Weight in Kg' />
                                                </div>
                                            }


                                        </div>
                                        :
                                        reportName === "WORKOUTS" ?
                                            <div className='WORKOUTS'>

                                                <form action="">
                                                    <input type="number" placeholder='number of workout done' className='form-control mb-3' />
                                                    <input type="date" placeholder='Date of consume' className='form-control mb-3' />

                                                    <button className='btn btn-success form-control mb-3'>Update Report</button>
                                                </form>

                                                <button className='btn btn-danger form-control mb-3' onClick={() => setShowTargetField(true)} >Set Target</button>

                                                {
                                                    showTargetField &&
                                                    <div className='d-flex gap-2'>
                                                        <button className='btn btn-danger'>Save</button>
                                                        <input type="text" className='form-control' placeholder='Workouts  (Recommended 6-8)' />
                                                    </div>
                                                }


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