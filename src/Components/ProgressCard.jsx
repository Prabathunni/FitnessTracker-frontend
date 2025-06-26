import React, { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'

function ProgressCard() {

    const [data, setData] = useState()


    const getData = () => {

        const temp = [{
            "name": "CALORIE INTAKE",
            "value": 2000,
            "unit": "KCAL",
            "goal": 2500,
            "goalUnit": "KCAL",
        }, {
            "name": "SLEEP",
            "value": 8,
            "unit": "hrs",
            "goal": 8,
            "goalUnit": "hr",
        }, {
            "name": "WATER INTAKE",
            "value": 3,
            "unit": "litre",
            "goal": 4,
            "goalUnit": "litre",
        }, {
            "name": "WEIGHT",
            "value": 60,
            "unit": "KG",
            "goal": 70,
            "goalUnit": "KG",
        }, {
            "name": "WORKOUTS",
            "value": 2,
            "unit": "workouts",
            "goal": 6,
            "goalUnit": "workouts",
        }
        ]

        setData(temp)


    }

    useEffect(() => {
        getData()
    }, [])



    return (
        <div className='container d-flex gap-3 flex-wrap flex-column flex-md-row justify-content-evenly align-items-center'>


            {data?.length > 0 && data.map((item, index) => (



                <div className='result-card d-flex flex-column align-items-center gap-3 rounded shadow-sm p-1 border border-primary' key={index}>

                    <div className="d-flex justify-content-evenly mt-2 gap-1">
                        <div className='bg-light d-flex flex-column  rounded shadow text-center p-2' style={{ width: "130px", height: "70px" }} >
                            <p className='fw-bolder' style={{ fontSize: "12px", marginBottom: "1px" }}>{item.name}</p>
                            <p style={{ fontSize: "15px", color: "gray" }}>{item.value} {item.unit}</p>
                        </div>

                        <div className='bg-light d-flex flex-column rounded shadow text-center p-2' style={{ width: "130px", height: "70px" }}>
                            <p className='fw-bolder' style={{ fontSize: "12px", marginBottom: "1px" }}>TARGET</p>
                            <p style={{ fontSize: "15px", color: "gray" }}>{item.goal} {item.goalUnit}</p>

                        </div>

                    </div>

                    <div className='d-flex align-items-center justify-content-betweeen gap-3'>

                        <Link to={`/report/${item.name}`} className='mt-3 btn btn-outline-success text-light'>show report <i className="fa-solid fa-eye"></i></Link>
                        
                        <div style={{ width: 80, height: 80 }}>
                            <CircularProgressbar
                                value={(item.value/item.goal)}
                                maxValue={1}
                                text={`${item.value}/${item.goal}`}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                    textSize:"11px",
                                    backgroundColor: "#113ecb ",
                                    textColor: "#fff",
                                    pathColor: "#fff",
                                    trailColor: "transparent"
                                })}
                            />
                        </div>
                    </div>

                </div>
            ))

            }

        </div>
    )
}

export default ProgressCard