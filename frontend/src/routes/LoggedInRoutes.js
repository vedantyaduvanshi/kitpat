import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Landing from '../pages/landingpage/Landing'

export default function LoggedInRoutes() {
  const {user} = useSelector((state)=>({...state}));
  return user ? <Outlet/> : <Landing/>;
}
