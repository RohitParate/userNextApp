'use client'
import React, { useEffect } from 'react'
import Login from './(auth)/login/page'
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/features/user/userSlice';
import axios from "../Axios/axiosInstance"

const LoginPage = () => {
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    if(sessionStorage.getItem('token')){
      try{
        const user = await axios.get("/api/user/session");
        if(user.data.result.statusCode === 200){
          dispatch(setUser(user.data.result.value));
        }
      }catch(error){
        
      }
    }
  }
  useEffect(() => {
    debugger;
    getCurrentUser();
  },[])
  return (
    <Login/>
  )
}

export default LoginPage