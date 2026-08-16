import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../store/AuthSlice'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import RoleChooser from '@/Pages/RoleChooser'


function ProtectedRoutes() {
    const isAuthenticated=useSelector((state)=>(state.auth.isAuthenticated))
    console.log("ProtectedRoutes render, isAuthenticated:", isAuthenticated)
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
    isAuthenticated? <Outlet/>:<RoleChooser/>
    
  )
}

export default ProtectedRoutes
