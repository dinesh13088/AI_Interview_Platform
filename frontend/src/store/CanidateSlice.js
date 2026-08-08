import { createSlice } from "@reduxjs/toolkit"


const accessToken=localStorage.getItem('accessToken')
const initialState={
    accessToken:accessToken,
    user:null,
    candidate:null, 
}
export const candidateSlice=createSlice(
    {
        name:'candidate',
        initialState:initialState,
        reducers:{
            setUser:(state,action)=>{
                const {tokens,user}=action.payload
                state.user=user
                state.accessToken=tokens.access
                localStorage.setItem("accessToken",tokens.access)
            },
            setCanididate:(state,action)=>{
                const canidate=action.payload
                state.candidate=canidate
            },
            logout:(state)=>{
                state.accessToken=null
                state.user=null
                state.candidate=null
                localStorage.removeItem('accessToken')
                
            }

        }
    }
)
export const{setUser,setCanididate,logout}=candidateSlice.actions
export default candidateSlice.reducer