'use client'
import { Button, Card, Grid, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "../../../Axios/axiosInstance"
import { clearUser } from '@/lib/features/user/userSlice';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const UserList = () => {

  const user = useSelector((state: any) => state.user)

  const router = useRouter();

  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 7,
  });
  const [loading, setLoading] = useState(false);
  const columns : GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: true,
    },
    {
      headerName: 'Action',
      field : 'action',
      width: 110,
      renderCell: (params : any) => {
        const deleteUser = async () => {
          try {
            const deleteResponse = await axios.delete(`/api/user/${params.row.id}`);
            if (deleteResponse.status === 204) {
              alert("Deleted Successfully");
              getUserData();
            }
          } catch (error) {
            console.log(error);
          }
        }
        const editUser = () => {
          router.push(`/user/update/${params.row.id}`)
        }
        return (
          <>
            <IconButton aria-label="delete">
              <EditIcon onClick={editUser} />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon onClick={deleteUser} />
            </IconButton>
          </>
        )
      }
    },
  ];

  const getUserData = async () => {
    setLoading(true);
    try {
      const userData: any = await axios.get(`/api/user?pageNumber=${paginationModel.page + 1}&pageSize=${paginationModel.pageSize}`);
      console.log(userData.data)
      setRows(userData.data);
      setTotalRows(JSON.parse(userData.headers.get('X-Pagination')).TotalItemCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(clearUser());
    router.push("/");
  }

  const handlePageChange = (value: any) => {
    setPaginationModel({ page: value.page, pageSize: value.pageSize });
    // getUserData();
  }

  useEffect(() => {
    getUserData();
  }, [paginationModel.page, paginationModel.pageSize])

  return (
    <>
      <Card sx={{ m: 1, textAlign: 'left' }} >
        <Grid container>
          <Grid xs={6}>
            <Button variant='contained' onClick={() => router.push("/register")}>Add User</Button>
          </Grid>
          <Grid xs={6} textAlign='right'>
            {user.currentUser?.name}
            <IconButton aria-label="delete" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ m: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={totalRows}
          loading={loading}
          pageSizeOptions={[5]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={handlePageChange}
        />
      </Card>
    </>
  )
}

export default UserList