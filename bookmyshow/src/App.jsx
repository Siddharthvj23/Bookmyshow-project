
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import { useSelector } from 'react-redux'
function App() {

  const {loading} = useSelector((state) => state.loader)

  return (
    <>
      <div className='App'>
        {loading && <div> Loading...</div>}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
