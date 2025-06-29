import React, { useState } from 'react'
import styles from './Updatepopup.module.css'
import { ImCross } from 'react-icons/im'
import { useAuth } from '../contexts/AuthContext';
import { addCalorieIntakeAPI } from '../services/userServices';


function UpdatePopUp({ reportName }) {
    const { setShowUpdatePopUp } = useAuth()


    const [item, setItem] = useState("")
    const [quantity, setQuantity] = useState()
    const [unit, setUnit] = useState("")
    const [date, setDate] = useState()

    const [calorieDataEntries, setCalorieDataEntries] = useState()

    const addCalorieIntake = async (e) => {
        e.preventDefault()

        if (!item || !quantity || !unit || !date) {
            alert("Please fill all fields");
            return;
        }
        setCalorieDataEntries({
            item,
            quantity,
            unit,
            date: new Date(date)
        })

        try {

           if (calorieDataEntries) {
                const result = await addCalorieIntakeAPI(calorieDataEntries)
                alert(result.data.response);
            }

        } catch (error) {
            console.log(error.response);

        }


    }





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

                                <form onSubmit={addCalorieIntake}>
                                    <input type="text" placeholder='food item name' value={item} onChange={e => setItem(e.target.value)} className='form-control mb-3' required />
                                    <input type="number" placeholder='quantity' value={quantity} onChange={e => setQuantity(e.target.value)} className='form-control mb-3' required />

                                    <select
                                        className="form-control mb-3"
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select quantity unit
                                        </option>
                                        <option value="g">Gram</option>
                                        <option value="kg">KG</option>
                                        <option value="ml">Milli Litre</option>
                                        <option value="l">Litre</option>
                                    </select>

                                    <input type="datetime-local" placeholder='' value={date} onChange={e => setDate(e.target.value)} className='form-control mb-3' required />

                                    <button type='submit' className='btn btn-success mb-3 form-control'>Update Report</button>
                                </form>
                            </div>
                            :
                            reportName === "SLEEP" ?
                                <div className='SLEEP'>

                                    <form action="">

                                        <input type="number" placeholder='Hours slept?' className='form-control mb-3' />
                                        <input type="date" className='form-control mb-3' />

                                        <button className='btn btn-success form-control mb-3'>Update Report</button>
                                    </form>


                                </div>
                                :
                                reportName === "WATER INTAKE" ?
                                    <div className='WATER INTAKE'>

                                        <form action="">
                                            <input type="number" placeholder='water consumed in Litre' className='form-control mb-3' />
                                            <input type="date" placeholder='Date' className='form-control mb-3' />

                                            <button className='btn btn-success form-control mb-3'>Update Report</button>
                                        </form>

                                    </div>
                                    :


                                    reportName === "WEIGHT" ?
                                        <div className='WEIGHT'>
                                            <form action="">
                                                <input type="number" placeholder='weight' className='form-control mb-3' />
                                                <input type="date" placeholder='Date' className='form-control mb-3' />

                                                <button className='btn btn-success form-control mb-3'>Update Report</button>
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