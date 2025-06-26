import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutWithFooter from '../Components/LayoutWithFooter'
import HomePage from '../Pages/HomePage'
import WorkoutLogger from '../Pages/WorkoutLogger'
import Report from '../Pages/Report'
import Profile from '../Pages/Profile'
import AdminPage from '../Pages/AdminPage'
import { verifyTokenAPI } from '../services/userServices'
import { useAuth } from '../contexts/AuthContext'

function AppRoutes() {
        const { isUserLogged, setIsUserLogged } = useAuth();
    

        useEffect(() => {
    
            const checkVerifyToken = async () => {
                try {
    
                    const valid = await verifyTokenAPI()
                    if (valid) {
                        setIsUserLogged(true)
                    } else {
                        setIsUserLogged(false)
                    }
    
                } catch (error) {
                    console.log(error.response.data);
                    setIsUserLogged(false)
                }
            }   

            checkVerifyToken()
        }, [])
    
    


    return (
        <Routes>
            <Route element={<LayoutWithFooter />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/workout/:type' element={<WorkoutLogger />} />
                <Route path='/report/:dataName' element={<Report />} />
                <Route path='/profile' element={<Profile />} />
            </Route>

            <Route path='/admin' element={<AdminPage />} />
        </Routes>
    )
}

export default AppRoutes