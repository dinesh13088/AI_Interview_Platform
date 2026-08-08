import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import App from '../App'
import { useDispatch } from 'react-redux'
import { logout } from '../store/AuthSlice'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'


function ProtectedRoutes() {
    const isAuthenticated=useSelector((state)=>(state.auth.isAuthenticated))
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        const interval=setInterval(()=>{
        const token=localStorage.getItem("accessToken")
        if (!token){
            dispatch(logout())
            navigate("/")
        }
    },1000)
    return ()=>{
        clearInterval(interval)
    }
    },[isAuthenticated,dispatch,navigate])

  return (
    isAuthenticated? <Outlet/>:<App/>
    
  )
}

export default ProtectedRoutes
