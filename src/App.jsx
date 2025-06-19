import { Route, Routes } from 'react-router-dom'
import WorkoutLogger from './Pages/WorkoutLogger'
import Report from './Pages/Report'
import Profile from './Pages/Profile'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer'

function App() {

  return (
    <>

      <AuthProvider>


        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/workout/:type' element={<WorkoutLogger />} />
          <Route path='/report/:reportType' element={<Report />} />
          <Route path='/profile' element={<Profile />} />

        </Routes>

      </AuthProvider>

      <Footer />

    </>
  )
}

export default App
