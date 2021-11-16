import './userList.css'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserCall, getUsersCall } from '../../../redux/apiCalls';

const UserList = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    getUsersCall(dispatch);
  },[dispatch])
  
  const users = useSelector( (state) => state.user.users);

  const handleDelete = (id) => {
    deleteUserCall(id,dispatch);
  };

  
   const columns = [
    { field: "_id", headerName: "ID", width: 260 },
    {
      field: "user",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img || "images/defaultprofile.jpg"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "isAdmin", headerName: "Admin", width: 160 },
    { field: "phone", headerName: "Phone", width: 200 },
    { field: "birthDate", headerName: "Date of birth", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname:"/user/" + params.row._id , user : params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];    
   return (
      <div className="userList">
         <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        // rowsPerPageOptions
        pageSize={10}
        checkboxSelection
        getRowId={ row => row._id}
      /> 
      </div>
   )
}

export default UserList
