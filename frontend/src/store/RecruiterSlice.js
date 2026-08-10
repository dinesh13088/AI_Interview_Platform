import { createSlice } from "@reduxjs/toolkit"


const accessToken=localStorage.getItem('accessToken')
const initialState={
    accessToken:accessToken,
    user:null,
    recruiter:null, 
}
export const recruiterSlice=createSlice(
    {
        name:'recruiter',
        initialState:initialState,
        reducers:{
            setUser:(state,action)=>{
                const {tokens,user}=action.payload
                state.user=user
                state.accessToken=tokens.access
                localStorage.setItem("accessToken",tokens.access)
            },
            setRecruiter:(state,action)=>{
                const recruiter=action.payload
                state.recruiter=recruiter
            },
            logout:(state)=>{
                state.accessToken=null
                state.user=null
                state.recruiter=null
                localStorage.removeItem('accessToken')
                
            }

        }
    }
)
export const{setUser,setRecruiter,logout}=recruiterSlice.actions
export default recruiterSlice.reducer