import React from 'react'
import axios from 'axios';
import EverythingProfile from '../../components/profilecomponents/EverythingProfile'
import Helmet from 'react-helmet';
import Topbar from '../../components/topbar/Topbar'
import "./profile.css"
import PublishPost from '../../components/everything/sendpost/PublishPost';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { profileReducer } from '../../functions/reducer';
import Cookies from 'js-cookie';
import Left from '../../components/everything/leftsection/Left';
import Right from '../../components/everything/right/Right';
import ProfileContext from './ProfileContext';
import { useContext } from 'react';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state})); 
  const {Profilo} = useContext(ProfileContext)
  const {UpdateProfile} = useContext(ProfileContext);


  //Regarding user profile backend stuff bitch
  const{username} = useParams();
  var userName = username === undefined ? user.username : username;
  const [{loading, error, profile},dispatch] = useReducer(profileReducer,{
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    if (Profilo === undefined) {
      getProfile();
    }else{
      dispatch({
        type:"PROFILE_SUCCESS",
        payload: Profilo,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[username]);




  ///Just for error Chal jae
console.log(loading, error)

  const getProfile = async()=>{
    try {
     
      dispatch({
        type:"PROFILE_REQUEST",
      });
      
         const {data} = await axios.get(`${process.env.REACT_APP_NACKEND_URL}/getProfile/${userName}`,{
          headers:{
          Authorization: `Bearer ${user.token}`,
        }
         });
         if(data.ok === false){
          navigate("/home")
         }else{
          dispatch({
            type:"PROFILE_SUCCESS",
            payload: data,
          });
          if (Profilo === undefined) {
            UpdateProfile(data)
          }
         }

    } catch (error) {
      if(error.response.data === "Invalid Authentication")
      console.log("sahi hai bahai")
      dispatch({
        type:"PROFILE_ERROR",
        payload: error.response.data.message,
      });
      logout()
    }
  }



const logout =()=>{
Cookies.set("user", "")
dispatch({
type:'LOGOUT',
});
navigate("/");
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
     <div id="HomeEverything" >
     <Left/>
     <EverythingProfile user={user}  profile={profile}/>
     <Right/>
     </div>
    <PublishPost/>
    </>
  )
}
