import React from 'react'
import LoginForm from '../components/login/LoginForm'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/auth';

function Login() {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    // 1. Pass the user name password to backend
    // 2. If authenticated gets success set isAuthenticated to true. 
    // 3. Right now there is no backend engaged we going to set isAuthenticated to true 
    e.preventDefault();
    dispatch(login());
    navigate('/dashboard');
  }
  return <LoginForm handleSubmit={handleSubmit} />;
}

export default Login