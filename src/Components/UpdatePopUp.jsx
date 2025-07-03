import React, { useState } from 'react'
import styles from './Updatepopup.module.css'
import { ImCross } from 'react-icons/im'
import { useAuth } from '../contexts/AuthContext';
import { addCalorieIntakeAPI, addSleepAPI, addWaterAPI, addWeightAPI } from '../services/userServices';
import { toast, ToastContainer } from 'react-toastify';


function UpdatePopUp({ reportName, onUpdateSuccess }) {
    const { setShowUpdatePopUp } = useAuth()

    // Calorie
    const [item, setItem] = useState("")
    const [quantity, setQuantity] = useState()
    const [unit, setUnit] = useState("")

    const [date, setDate] = useState()

    // sleep
    const [durationInHr, setDurationInHr] = useState()

    // water
    const [waterTakenInMl, setWaterTakenInMl] = useState()

    // weight
    const [weight, setWeight] = useState()

    const [calorieDataEntries, setCalorieDataEntries] = useState()
    const [sleepDateEntries, setSleepDataEntries] = useState()
    const [waterDataEntries, setWaterDataEntries] = useState()
    const [weightDataEntries, setWeightDataEntries] = useState()

    const addCalorieIntake = async (e) => {
        e.preventDefault()

        if (!item || !quantity || !unit || !date) {
            toast.warning("Please fill all fields");
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
                toast.success(result.data.response);
                setCalorieDataEntries(),
                    setItem(""),
                    setQuantity(),
                    setUnit(""),
                    setDate()
                setShowUpdatePopUp(false)
                onUpdateSuccess?.();


            }

        } catch (error) {
            console.log(error.response);
            setShowUpdatePopUp(false)


        }
    }

    // Add Sleep
    const addSleep = async (e) => {
        e.preventDefault()

        if (!date || !durationInHr) {
            toast.warning("Please Provide all inputs")
        }

        setSleepDataEntries({
            date: new Date(date),
            durationInHr
        })

        try {
            if (sleepDateEntries) {
                const result = await addSleepAPI(sleepDateEntries)
                // console.log(result);
                toast.success(result.data.response);
                setSleepDataEntries(),
                    setDate()
                setDurationInHr()
                setShowUpdatePopUp(false)
                onUpdateSuccess?.();

            }

        } catch (error) {
            console.log(error.response);
            setShowUpdatePopUp(false)
        }


    }

    // Add Water 
    const addWater = async (e) => {
        e.preventDefault()

        if (!date || !waterTakenInMl) {
            toast.warning("Please Provide all inputs")
        }

        setWaterDataEntries({
            date: new Date(date),
            waterTakenInMl
        })

        try {
            if (waterDataEntries) {
                const result = await addWaterAPI(waterDataEntries)
                // console.log(result);
                toast.success(result.data.response);
                setWaterDataEntries(),
                setDate()
                setWaterTakenInMl()
                setShowUpdatePopUp(false)
                onUpdateSuccess?.();

            }

        } catch (error) {
            console.log(error.response);
            setShowUpdatePopUp(false)
        }



    }


    const addWeight = async (e) => {
        e.preventDefault()

        if (!date || !weight) {
            toast.success("Please Provide all inputs")
        }

        setWeightDataEntries({
            date: new Date(date),
            weight
        })

        try {
            if (weightDataEntries) {
                const result = await addWeightAPI(weightDataEntries)
                // console.log(result);
                toast.success(result.data.response);
                setWeightDataEntries(),
                setDate()
                setWeight()
                setShowUpdatePopUp(false)
                onUpdateSuccess?.();

            }

        } catch (error) {
            console.log(error.response);
            setShowUpdatePopUp(false)
            if(error.status===404){
                toast.error(error.response.data.response)
            }
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

                                        <input type="number" onChange={e => setDurationInHr(e.target.value)} placeholder='Hours slept?' className='form-control mb-3' required />
                                        <input type="date" onChange={e => setDate(e.target.value)} className='form-control mb-3' required />

                                        <button onClick={addSleep} className='btn btn-success form-control mb-3'>Update Report</button>
                                    </form>


                                </div>
                                :
                                reportName === "WATER INTAKE" ?
                                    <div className='WATER INTAKE'>

                                        <form action="">
                                            <input type="number" onChange={e => setWaterTakenInMl(e.target.value)} placeholder='water consumed in MiliLitre' className='form-control mb-3' required />
                                            <input type="date" onChange={e => setDate(e.target.value)} placeholder='Date' className='form-control mb-3' required />

                                            <button onClick={addWater} className='btn btn-success form-control mb-3'>Update Report</button>
                                        </form>

                                    </div>
                                    :


                                    reportName === "WEIGHT" ?
                                        <div className='WEIGHT'>
                                            <form action="">
                                                <input type="number" onChange={e=>setWeight(e.target.value)} placeholder='weight in Kg' className='form-control mb-3' required />
                                                <input type="date" onChange={e=>setDate(e.target.value)} placeholder='Date' className='form-control mb-3' required />

                                                <button onClick={addWeight} className='btn btn-success form-control mb-3'>Update Report</button>
                                            </form>

                                        </div>
                                        :
                                        <h5 className='fw-bolder text-warning  text-center'>Coming Soon...</h5>

                    }



                </div>



            </div>


      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />



        </div>
    )
}

export default UpdatePopUp