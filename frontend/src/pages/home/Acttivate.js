import React from 'react'
import Helmet from 'react-helmet';

import Topbar from '../../components/topbar/Topbar'
import "./home.css"
import { useState } from 'react';
import ActivateForm from './ActivateForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';


export default function Acttivate() {
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const {user} = useSelector((user) => ({ ...user}));
  const[success,setSuccess] = useState("");
  const[error,setErrror] = useState("");
 
  const {token}= useParams();
  useEffect(()=>{
  activateAccount();
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  
  const activateAccount = async()=>{
    try {
      const {data}= await axios.post(`${process.env.REACT_APP_NACKEND_URL}/activate`,
      {token},
      {
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
      });
      setSuccess(data.message);
      Cookies.set('user',JSON.stringify({...user,verified:true}));
      dispatch({
        type:'VERIFY',
        payload:true,
      });
      setTimeout(()=> {
        navigate("/home");
      }, 4000);
    } catch (error) {
      setErrror(error.response.data.message)
      setTimeout(()=> {
        navigate("/home");
      }, 4000);
    }
  }
  return (
    <>
<React.Fragment>
         <Helmet>
             <style>
                {`
                 body {
                  height: auto;
                  background-color: #192824;
                  overflow-y: auto;
                  overflow-x: hidden;
                  }

                  *::-webkit-scrollbar {
                    width: 11px;
                  }
                  
                  *::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.137);
                    border-radius: 10px;
                  }
                  
                  *::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 234, 255, 0.705);
                    border-radius: 10px;
                    border: 3px solid #ffffff00;
                  }
                  * {
                  margin: 0;  
                  padding: 0;
                  box-sizing: border-box;
                }
                         
                  
                `}
            </style>
         </Helmet>
     
         </React.Fragment>




  <Topbar/> 

  {
    success && (
      <ActivateForm
      type="success"
      header="It Worked!"
      text={success}
      redirecting="Redirecting to home..."
    />
    )
  }
{
    error && (
      <ActivateForm
      type="error"
      header="Account Verification Failed!"
      text={error}
      redirecting="Redirecting to home..."
    />
    )
  }

  </>
  )
}
