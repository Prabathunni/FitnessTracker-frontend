import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLoginAPI } from '../services/userServices'
import { useAuth } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';


function AdminLogin() {

    const { setIsUserLogged } = useAuth()

    const navigate = useNavigate();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [adminData, setAdminData] = useState()


    const loginAdmin = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.warning("Provide All inputs")
        }

        setAdminData({
            email,
            password
        })

        try {

            if (adminData) {
                await adminLoginAPI(adminData)
                toast.success("Admin Authenticated")
                // console.log(result);
                setIsUserLogged(true)
                navigate('/admin')
                setAdminData()
                setEmail()
                setPassword()

            }

        } catch (error) {
            console.log(error);
            if (error.status === 404) {
                toast.error(error.response.data)
            }
        }
    }

    return (
        <div style={{ minHeight: "100vh" }} className='d-flex justify-content-center align-items-center'>

            <div className='bg-light p-5 rounded'>

                <h4>Admin Authentication</h4>
                <hr />

                <form onSubmit={loginAdmin}>
                    <input type="text" value={email} placeholder='admin mailID' onChange={e => setEmail(e.target.value)} className='form-control mb-3' required />
                    <input type="password" value={password} placeholder='admin password' onChange={e => setPassword(e.target.value)} className='form-control mb-3' required />
                    <input type="submit" value="Authenticate" className='form-control btn btn-danger mb-3' />

                    <p>not an Admin? <Link to="/">Go Back to Home</Link></p>
                </form>

            </div>

            <ToastContainer
                position="top-left"
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

export default AdminLogin