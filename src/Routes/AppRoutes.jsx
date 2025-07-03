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
import NotFound from '../Components/NotFound'
import AdminLogin from '../Pages/AdminLogin'
import Users from '../Pages/Users'
import ViewUser from '../Pages/ViewUser'
import AllWorkouts from '../Pages/AllWorkouts'
import AllExercises from '../Pages/AllExercises'

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
        <>
            {
                isUserLogged ?
                    <Routes>
                        <Route element={<LayoutWithFooter />}>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/workout/:id' element={<WorkoutLogger />} />
                            <Route path='/report/:dataName' element={<Report />} />
                            <Route path='/profile' element={<Profile />} />
                        </Route>

                        <Route path='/admin' element={<AdminPage />} />
                        <Route path='/adminlogin' element={<AdminLogin />} />
                        <Route path='/allusers' element={<Users />} />
                        <Route path='/allusers/:id' element={<ViewUser />} />
                        <Route path='/allworkouts' element={<AllWorkouts />} />
                        <Route path='/allexercises/:workoutId' element={<AllExercises />} />


                    </Routes>
                    :
                    <div>
                        <Routes>
                            <Route path='*' element={<NotFound />} />
                            <Route element={<LayoutWithFooter />}>
                                <Route path='/' element={<HomePage />} />
                                <Route path='/adminlogin' element={<AdminLogin />} />
                            </Route>
                        </Routes>

                    </div>
            }

        </>
    )
}

export default AppRoutes