import React, { useState } from 'react'
import styles from './Updatepopup.module.css'
import { ImCross } from 'react-icons/im'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function UpdatePopUp({ setShowUpdatePopUp }) {



    const [startDate, setStartDate] = useState(new Date());


    return (
        <div className={`${styles.UpdatePopUp}`}>


            <div>

                <button style={{ width: "35px" }} className='btn text-white' onClick={() => setShowUpdatePopUp(false)}>
                    <ImCross />
                </button>


                <div className='border rounded d-flex justify-content-center flex-column p-2'>


                        <h4 className='text-center text-white fw-bolder'>Report</h4>

                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='form-control mb-3' dateFormat={"dd/MMMM"} />

                        <input type="number" placeholder='total calories in kcal' className='form-control mb-3' />

                        <button className='btn btn-success mb-3'>Update Report</button>


                </div>



            </div>





        </div>
    )
}

export default UpdatePopUp