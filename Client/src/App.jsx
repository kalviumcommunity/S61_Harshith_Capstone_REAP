import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/LoginPage/signup' 
import Landingpage from './components/LandingPage/Landingpage';
import LoginForm from './components/LoginPage/login';
import Dashboard from './components/dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
