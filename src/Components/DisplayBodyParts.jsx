import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Auth.module.css'


function DisplayBodyParts({ item }) {
    return (
        <div>
            <div className={styles.workoutCard}
                style={{
                    width: '220px',
                    height: '160px',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Link
                    className='btn btn-outline-primary btn-sm text-white'
                    to={`/workout/${item.type}`}
                    style={{ fontSize: '20px', fontWeight: 'bold', textShadow: '1px 1px 5px rgba(0,0,0,0.7)' }}
                >
                    {item.type}
                </Link>
            </div>
        </div>
    )
}

export default DisplayBodyParts