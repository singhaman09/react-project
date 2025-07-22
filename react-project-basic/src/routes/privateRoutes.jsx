import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoutes() {
    const { isAuthenticated }=useSelector(state=>state.auth);
  return (
    isAuthenticated?<Outlet/>:<Navigate to='login'/>
  )
}

export function PublicRoute() {
  const { isAuthenticated }=useSelector(state=>state.auth);
  return (
    isAuthenticated?<Navigate to='dashboard'/>:<Outlet/>
  )
}
