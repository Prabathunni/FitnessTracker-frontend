import React from 'react';
import styles from './Auth.module.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footerdiv} >


      <div className='w-50 d-flex flex-column justify-content-center align-items-center' style={{marginTop:"29px"}}>
        <Link className='d-flex text-decoration-none text-white' to={'/'} >
          <img src="/heart-rate.png" className='' style={{ width: "30px", height: "30px" }} alt="logo" />
          <h4>Fitness Tracker</h4>
        </Link>

        <hr className="w-100 border-top border-white" />

        <p>Connect with Us</p>

        <div className='d-flex gap-3'>
          <p style={{ cursor: 'pointer' }}><i className="fa-brands fa-x-twitter"></i></p>
          <p style={{ cursor: 'pointer' }}><i className="fa-brands fa-github"></i></p>
          <p style={{ cursor: 'pointer' }}><i className="fa-brands fa-linkedin"></i></p>
          <p style={{ cursor: 'pointer' }}><i className="fa-brands fa-github"></i></p>
        </div>



         <Link style={{ cursor: 'pointer' }}><i className="fa-solid fa-user-tie"></i></Link>












      </div>






    </div>
  );
};

export default Footer;
