import { Button, Card, Label, TextInput, Select } from "flowbite-react";
import { Link } from "react-router";
import { useState,useEffect } from "react";
import { Dialogue } from "../Components/Dialogue";


export default function Register() {

const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:"",
    confirm_password:"",
    role:""

  })

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setAlertMessage("Registration successful! Welcome aboard!");
    setShowAlert(true);
    
    
  };
  useEffect(() => {
    if (!showAlert) return;

    const timer = setTimeout(() => {
        setShowAlert(false);
    }, 5000);
    return () => clearTimeout(timer);
}, [showAlert]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 flex-col">
      <Card className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign up to get started
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
          
          <div>
            <div className="mb-2 block " >
              <Label htmlFor="username" > Username</Label>
              <TextInput
              id="username"
              type="text"
              placeholder="johndoe"
              value={formData.username}
              required
              onChange={(e)=>{
                setFormData({...formData,username:e.target.value})
              }}
               
            />
            </div>
            
          </div>

          {/* Email Field */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" >Email</Label>
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              required
              onChange={(e)=>{
                setFormData({...formData,email:e.target.value})
              }}
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" >Password</Label>
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              required
              onChange={(e)=>{
                setFormData({...formData,password:e.target.value})
              }}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword"  >Confirm Password</Label>
            </div>
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={formData.confirm_password}
              onChange={(e)=>{
                setFormData({...formData,confirm_password:e.target.value})
              }}
            />
          </div>

          {/* Role Selection */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="role" value="Role" />
            </div>
            <Select id="role" required value={formData.role} onChange={(e)=>{
                setFormData({...formData,role:e.target.value})
            }}>
              <option value="">Select a role</option>
              <option value="Candidate" >Candidate</option>
              <option value="Recruiter">Recruiter</option>
              
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-2" >
            Create Account
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
            </span>
            <Link
              to='/'
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign in
            </Link>
          </div>
        </form>
      </Card>
      {showAlert && <Dialogue/> }
      
    </div>
    
    
  );
}