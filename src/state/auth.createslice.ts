import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from '../config/api/auth.api';
import TotalCreateAsyncThunk from '../utils/thunk/index';

const localstorage ={
    user_info:'user',
    token:'token',
    refresh_token: "refresh_token",
    expiredAt:'expires',
}

export const register:any = createAsyncThunk('/auth/register', async (formdatasubmit,{rejectWithValue}) => {  
    try {
        const response = await authAPI.register(formdatasubmit);    
        return response; 
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
})
export const sendmail:any = createAsyncThunk('/auth/get-verify-email-code', async (formdatasubmit,{rejectWithValue}) => {  
    try {      
        const response = await authAPI.sendotp(formdatasubmit);   
        return response; 
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
})

// Verify Code Forgot
export const sendmailForgot:any = createAsyncThunk('/auth/get-verify-forgot-password', async (formdatasubmit,{rejectWithValue}) => {  
    try {      
        const response = await authAPI.sendotpForgot(formdatasubmit);   
        return response; 
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
})

// Send verify code ForgotPassword 
export const verifycodeforgot:any = createAsyncThunk('/auth/forgot-password', async (formdatasubmit,{rejectWithValue}) => {  
    try {
        const response = await authAPI.forgotPassword(formdatasubmit);    
        return response; 
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
})



export const login:any = createAsyncThunk('/auth/login', async (formsubmit, thunkAPI) => {
    try {
        const response = await authAPI.login(formsubmit);
        console.log(response);
        return response
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error)
    }
})

// export const logout = createAsyncThunk('/auth/logout',async(data,thunkAPI)=>{
//     try {
//         console.log(data);
//         const response = await authAPI.logout(data);
//         console.log(response);
//         return response;
//     }
//     catch (err){
//         return thunkAPI.rejectWithValue(err)
//      }

// })


const handleFullFiled = (state,action)=>{
     // eslint-disable-next-line camelcase
     const {user_info,token,expiredAt} = action.payload.data;    
    //  alert()
    //  state.profile= userinfo;
    localStorage.setItem('user_info', JSON.stringify(user_info));
  
    // localStorage.setItem(localstorage.token,token);
    // localStorage.setItem(localstorage.expiredAt,expiredAt);    
}
const handleRejected = (state,action)=>{    
    state.profile= action.payload.data   
    console.log('reject logout',action);
}

const auth = createSlice({
    name: 'auth', // tên của state làm tiền tố
    initialState: { profile: JSON.parse(localStorage.getItem('user')) || { profile: '' } },
    reducers: {
       unauthorizes: (state,action)=>{
           console.log(action);
        state.profile={}
        localStorage.removeItem(localstorage.user_info)
        localStorage.removeItem(localstorage.token)
        localStorage.removeItem(localstorage.expiredAt)
       } 
    },
    extraReducers: {
        [register.fulfilled]:handleFullFiled,
        [register.rejected]:handleRejected,
        [login.fulfilled]:handleFullFiled,
        [login.rejected]:handleRejected,
        // [logout.fulfilled]: (state,action)=>{
        //     state.profile={}
        //     localStorage.removeItem(localstorage.user)
        //     localStorage.removeItem(localstorage.accessToken)
        //     localStorage.removeItem(localstorage.expires)
        // },        
    }
})


export const {unauthorizes}= auth.actions
const generateauthReducer  = auth.reducer;
export default generateauthReducer;
