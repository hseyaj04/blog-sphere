import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import {Header, Footer} from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error) => {
      throw new error
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-700">
      <div className="w-full">
        <Header />
        <main>
          TODO:<Outlet/>
        </main>
        <Footer />
      </div>
    </div>


  ) : (null)
  
}

export default App
