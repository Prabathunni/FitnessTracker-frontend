import { Route, Routes } from 'react-router-dom'
import WorkoutLogger from './Pages/WorkoutLogger'
import Report from './Pages/Report'
import Profile from './Pages/Profile'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './Pages/HomePage'
import LayoutWithFooter from './Components/LayoutWithFooter'
import AdminPage from './Pages/AdminPage'

function App() {

  return (
    <>

      <AuthProvider>


        <Routes >

          <Route element={<LayoutWithFooter/>}>
            <Route path='/' element={<HomePage />} />
            <Route path='/workout/:type' element={<WorkoutLogger />} />
            <Route path='/report/:reportType' element={<Report />} />
            <Route path='/profile' element={<Profile />} />
          </Route>


          <Route path='/admin' element={<AdminPage/> }/>

        </Routes>

      </AuthProvider>



    </>
  )
}

export default App
