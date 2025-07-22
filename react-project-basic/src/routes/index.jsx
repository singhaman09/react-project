import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../modules/Home';
import Login from '../modules/Login';
import About from '../modules/About';
import Layout from '../layout/Layout';
import Dashboard from '../components/dashboard/dashboard';
import { PrivateRoutes, PublicRoute } from './privateRoutes';
import NotFound from '../components/notfound/NotFound';

function RouteWrapper() {

// Three scenarios
// Routes which are accessible to authenticated users
// Routes which are accessible to non authenticated users
// Routes which are accessible to both users
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Private/Protected Route */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        {/* Public Route */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteWrapper;