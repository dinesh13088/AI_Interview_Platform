import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../store/AuthSlice'
export const store=configureStore(
    {
        reducer:{
            auth:authReducer,
        }
    }
)