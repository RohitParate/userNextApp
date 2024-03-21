"use client"
import React, { useState } from 'react'
import { Button, Container, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, userLogin } from '@/lib/features/user/userSlice'
import { AppDispatch } from '@/lib/store'
import { useRouter } from 'next/navigation'

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: any) => state.user.currentUser)
  const [loginCredentials, setLoginCredentials] = useState<{
    userName: string;
    password: string;
  }>({
    userName: "",
    password: ""
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(userLogin(loginCredentials));
    router.push("/user/list");
  };

  if (user.currentUser?.name) {
    // sessionStorage.setItem('token', user.token)
    // navigate("/user-list");
  }
  if (user.error?.message?.length) {
    dispatch(clearError());
    alert("login failed");
  }
  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" component="h1">
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField

          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="User Name"
          name="userName"
          autoComplete="User name"
          autoFocus
          value={loginCredentials.userName}
          onChange={(e) => setLoginCredentials((prev) => ({ ...prev, userName: e.target.value }))}
        />
        <TextField

          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={loginCredentials.password}
          onChange={(e) => setLoginCredentials((prev) => ({ ...prev, password: e.target.value }))}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"

        >
          Sign In
        </Button>
        <Button onClick={() => {
          router.push("/register")
        }}>
          Register
        </Button>
      </form>
    </Container>
  )
}

export default Login