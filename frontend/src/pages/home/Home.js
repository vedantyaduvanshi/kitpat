import React from 'react'
import axios from 'axios';
import Everything from '../../components/everything/Everything'
import Postswitch from '../../components/everything/postSwitch/Postswitch'
import PublishPost from '../../components/everything/sendpost/PublishPost'
import Helmet from 'react-helmet';
import Topbar from '../../components/topbar/Topbar'
import "./home.css"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useDispatch} from "react-redux"
import Cookies from 'js-cookie';




export default function Home({posts}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state}));  

  const checkifverifiedfromBackend= async()=>{
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_NACKEND_URL}/checkifverfied`,{},{
        headers:{
          Authorization : `Bearer ${user.token}`
        },
      });
      if (data.message === false) {
        navigate("/verify")
      }
    } catch (error) {
      if(error.response.data === "Invalid Authentication")
         console.log("sahi hai bahai")
         logout()
    }
  }


  const logout =()=>{
    sessionStorage.removeItem('pageView');
    Cookies.set("user", "")
  dispatch({
    type:'LOGOUT',
  });
  navigate("/");
  }



  
  useEffect(() => {
    checkifverifiedfromBackend();
    sessionStorage.setItem('backfuntion', "true");
  });

  return (
    <>

<React.Fragment >
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
                    width: 8px;
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
  <Postswitch/>
  <Everything posts={posts}  user={user} />
  <PublishPost/>
  </>
  )
}
