import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
// import Login from './components/Login'
import LoginNew from './components/LoginNew'
import Home from './containers/Home'


const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    if(!User) navigate('./login');
  },[])

  return (
    <Routes>
      <Route path="login" element={<LoginNew />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App