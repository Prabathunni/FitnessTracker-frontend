import { Route, Routes } from 'react-router-dom'
import WorkoutLogger from './Pages/WorkoutLogger'
import Report from './Pages/Report'
import Profile from './Pages/Profile'
import { AuthProvider } from './contexts/AuthContext'
import HomePage from './Pages/HomePage'
import LayoutWithFooter from './Components/LayoutWithFooter'
import AdminPage from './Pages/AdminPage'
import AppRoutes from './Routes/AppRoutes'
import ScrollToTop from './Components/ScrollToTop'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>

      <AuthProvider>

        <ScrollToTop />

        <AppRoutes />

        <ToastContainer
          position="top-right"
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


      </AuthProvider>



    </>
  )
}

export default App
