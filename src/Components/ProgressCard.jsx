import React, { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'
import { getAllReportAPI } from '../services/userServices';

function ProgressCard() {

    const [data, setData] = useState()



    const getAllReport = async () => {
        try {
            const result = await getAllReportAPI()
            const reportData = result.data.response;
            // console.log(reportData);    
            setData(reportData)

        } catch (error) {
            console.log(error.response.data.error);

        }
    }


    useEffect(() => {
        getAllReport()

    }, [])



    return (
        <div className='container py-4 d-flex flex-wrap justify-content-center gap-4'>

            {data?.length > 0 && data.map((item, index) => (
                <div
                    className='rounded-4 shadow border border-0 px-4 py-3 glass-card text-center'
                    key={index}
                    style={{
                        width: '280px',
                        backdropFilter: 'blur(12px)',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#fff',
                    }}
                >
                    <h5 className='fw-semibold mb-2' style={{ fontSize: '16px' }}>{item.name.toUpperCase()}</h5>

                    <div className='d-flex justify-content-between align-items-center mb-3 px-2'>
                        <div>
                            <p className='mb-1' style={{ fontSize: '12px', color: '#ccc' }}>Current</p>
                            <p className='fw-bold mb-0' style={{ fontSize: '20px' }}>{item.value} {item.unit}</p>
                        </div>
                        <div>
                            <p className='mb-1' style={{ fontSize: '12px', color: '#ccc' }}>Target</p>
                            <p className='fw-bold mb-0' style={{ fontSize: '20px' }}>{item.goal} {item.goalUnit}</p>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center mb-3'>
                        <div style={{ width: 80, height: 80 }}>
                            <CircularProgressbar
                                value={item.value}
                                maxValue={item.goal}
                                text={`${item.value}/${item.goal}`}
                                strokeWidth={12}
                                styles={buildStyles({
                                    strokeLinecap: 'round',
                                    textSize: '11px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `url(#gradient-${index})`,
                                    textColor: '#ffffff',
                                    trailColor: 'rgba(255, 255, 255, 0.1)',
                                    backgroundColor: 'transparent',
                                })}
                            />

                            <svg style={{ height: 0 }}>
                                <defs>
                                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#00c6ff" />
                                        <stop offset="100%" stopColor="#0072ff" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>

                    <Link
                        to={`/report/${item.name}`}
                        className='btn glass-btn px-4 py-2 mt-1 d-flex align-items-center gap-2'
                    >
                        <i className="fa-solid fa-eye"></i>
                        <span>Show Report</span>
                    </Link>
                    
                </div>
            ))}
        </div>
    )
}

export default ProgressCard