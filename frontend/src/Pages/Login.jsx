
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState ,useRef} from "react";
import { Link,useNavigate } from "react-router";
import {login} from '../api/auth.api'
import {useDispatch,useSelector} from 'react-redux'
import { setCredenials } from "../store/AuthSlice";

export default function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const isAuthenticated=useSelector((state)=>{
    return state.auth.isAuthenticated
  })

  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  
  const [err,setErr]=useState('')
  // const isMounted=useRef(false)
  useEffect(()=>{
    // if(!isMounted)
    // {
    //   return
    // }
    if(isAuthenticated){
       navigate("/home")

    }
  },[isAuthenticated])

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      console.log(formData)
      const response=await login(formData)
      console.log(response.data)
      const userData=response.data

      if (!userData){
        setErr("you do not have response")
        return
      }
      dispatch(setCredenials(userData))
      if (userData.tokens?.refresh){ localStorage.setItem("refresh",userData.tokens.refresh)}
     console.log(isAuthenticated)
     
    }
    catch(error){
      console.error(error)

    }

  }

  return (
    <Card className="max-w-sm w-full">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Your email</Label>
          </div>
          <TextInput id="email1" type="email" placeholder="name@flowbite.com" value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}} required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <TextInput id="password1" type="password" value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}} required />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
         <Link to="/register" className="text-sm text-blue-600 hover:underline m-auto ">Create Account</Link>;
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {/* <Label htmlFor="error">{err}</Label> */}
    </Card>
  );
}
