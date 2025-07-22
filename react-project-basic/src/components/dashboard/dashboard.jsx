import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>{
        dispatch(logout());
        navigate('/login');
    }
  return (
    <>
      <div>Dashboard</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Dashboard