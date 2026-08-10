// import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";
// const accessToken=localStorage.getItem("accessToken")
// const user=JSON.parse(localStorage.getItem("user")) || null;

// const initialState={
//     accessToken:accessToken ||null,
//     user:user,
//     isAuthenticated:!!accessToken,
//     candidate:null
// };
// export const rAuthSlice=createSlice(
//     {
//         name:'rauth',
//         initialState:initialState,
//         reducers:{
//             setCredenials:(state,action)=>{
//                 const {tokens,user,candidate}=action.payload   
//                 state.accessToken=tokens.access
//                 console.log(state.accessToken)
//                 state.user=user
//                 state.candidate=candidate
//                 state.isAuthenticated=true

//                 console.log(state.isAuthenticated)

//                 localStorage.setItem('accessToken',tokens.access)
//                 localStorage.setItem('user',JSON.stringify(user))

//             },
//             setAccessToken:(state,action)=>{
//                 const token=action.payload
//                 state.accessToken=token
//                 state.isAuthenticated=true
//             }
//             ,
//             logout:(state)=>{
//                 state.accessToken=null
//                 state.user=null
//                 state.isAuthenticated=false

//                 localStorage.removeItem('accessToken')
//                 localStorage.removeItem('user')

//             }
//         }
//     }
// )
// export const {setCredenials,logout,setAccessToken}=authSlice.actions
// export default authSlice.reducer


