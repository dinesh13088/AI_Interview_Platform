import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../store/AuthSlice'
import candidateReducer from '../store/CanidateSlice'
import recruiterReducer from '../store/RecruiterSlice'
import rAuthReducer from '../store/RecruiterAuthSlice'

export const store=configureStore(
    {
        reducer:{
            auth:authReducer,
            candidate:candidateReducer,
            recruiter:recruiterReducer,
            
            rAuth:rAuthReducer,
        }
    }
)