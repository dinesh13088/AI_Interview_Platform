import { createSlice } from "@reduxjs/toolkit";
const accessToken=localStorage.getItem("accessToken")
const user=JSON.parse(localStorage.getItem("user")) || null;
const initialState={
    accessToken:accessToken ||null,
    user:user,
    isAuthenticated:!!accessToken
};
export const authSlice=createSlice(
    {
        name:'auth',
        initialState:initialState,
        reducers:{
            setCredenials:(state,action)=>{
                const {tokens,user} =action.payload
                state.accessToken=tokens.access
                state.user=user
                state.isAuthenticated=true

                localStorage.setItem('acessToken',tokens.access)
                localStorage.setItem('user',JSON.stringify(user))

            },
            logout:(state)=>{
                state.accessToken=null
                state.user=null
                state.isAuthenticated=false

                localStorage.removeItem('acessToken')
                localStorage.removeItem('user')

            }
        }
    }
)
export const {setCredenials,logout}=authSlice.actions
export default authSlice.reducer


