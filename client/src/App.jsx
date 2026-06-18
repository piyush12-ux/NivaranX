import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  const [page, setPage] = useState('home')
  const { user } = useAuth()

  if (user) {
    return user.role === 'admin' ? <AdminDashboard /> : <Dashboard />
  }

  if (page === 'login') return <Login onSwitch={() => setPage('register')} onHome={() => setPage('home')} onForgot={() => setPage('forgot')} />
  if (page === 'register') return <Register onSwitch={() => setPage('login')} onHome={() => setPage('home')} />
  if (page === 'about') return <About onBack={() => setPage('home')} />
  if (page === 'contact') return <Contact onBack={() => setPage('home')} />
  if (page === 'forgot') return <ForgotPassword onBack={() => setPage('login')} />

  return <Home onLogin={() => setPage('login')} onRegister={() => setPage('register')} onAbout={() => setPage('about')} onContact={() => setPage('contact')} />
}

export default App