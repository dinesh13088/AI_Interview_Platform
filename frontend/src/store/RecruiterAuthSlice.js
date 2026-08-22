import { createSlice } from "@reduxjs/toolkit";

const accessToken=localStorage.getItem("accessToken")
const user=JSON.parse(localStorage.getItem("user")) || null;

const initialState={
    accessToken:accessToken ||null,
    user:user,
    isAuthenticated:!!accessToken,
    company:null,
    recruiter:null,
};
export const rAuthSlice=createSlice(
    {
        name:'rAuth',
        initialState:initialState,
        reducers:{
            setCredenials:(state,action)=>{
                const {access,user,recruiter,company}=action.payload 
                console.log(action.payload)  
                state.accessToken=access
                console.log(state.accessToken)
                state.user=user
                state.company=company
                state.recruiter=recruiter
                state.isAuthenticated=true

                localStorage.setItem('accessToken',access)
                
                localStorage.setItem('user', JSON.stringify(user))
               

            },
            
            
            logout:(state)=>{
                state.accessToken=null
                state.user=null
                state.company=null
                state.recruiter=null
                state.isAuthenticated=false

                localStorage.removeItem('accessToken')
                localStorage.removeItem('user')

            }
        }
    }
)
export const {setCredenials,logout,setAccessToken}=rAuthSlice.actions
export default rAuthSlice.reducer


