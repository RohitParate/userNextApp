'use client'
import { Button, Container, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import axios from "../../../Axios/axiosInstance"

const CreateUser = ({ userId }: { userId?: string }) => {

  const router = useRouter();

  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: '',
    email: '',
    password: ''
  });

  const [isEdit, setIsEdit] = useState<boolean>(userId ? true : false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isEdit) {
      try {
        const userUpdateResponse = await axios.put(`/api/user/${userId}`, userDetails);
        if (userUpdateResponse.status === 204) {
          router.push("/user/list");
        }
      } catch (error: any) {
        console.log(error.message)
      }
    } else {
      try {
        const userCreateResponse = await axios.post("/auth/register", userDetails);
        if (userCreateResponse.status === 200) {
          if (sessionStorage.getItem('token')) {
            router.push("/user/list");
          } else {
            router.push("/login");
            // sessionStorage.clear();
          }
        }
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  const getUserData = async () => {
    try {
      const userData = await axios.get(`/api/user/${userId}`);
      if (userData.status === 200) {
        setUserDetails(userData.data);
        setIsEdit(true);
      }
    } catch (error : any) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getUserData();
  }, [userId])

  return (
    <>
      {/* {userId ? <>Update User : {userId}</> : <>Create User</>} */}
      <Container component="main" maxWidth="xs">
        <Typography variant="h5" component="h1">
          {isEdit ? <>Update User</> : <>Create User</>}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField

            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={userDetails.name}
            onChange={(e) => setUserDetails((prev) => ({ ...prev, name: e.target.value }))}
          />
          <TextField

            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userDetails.email}
            onChange={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value }))}
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
            value={userDetails.password}
            onChange={(e) => setUserDetails((prev) => ({ ...prev, password: e.target.value }))}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

          >
            {isEdit ? <>Update</> : <>Create</>}
          </Button>
        </form>
        {/* <Button onClick={() => navigate("/login")}>
                Login
            </Button> */}
      </Container>
    </>
  )
}

export default CreateUser