import React, { useReducer, useState } from 'react'
import axios from 'axios';
import EverythingForSignlePost from './components/EverythingForSignlePost'
import PublishPost from '../../components/everything/sendpost/PublishPost'
import Helmet from 'react-helmet';
import Topbar from '../../components/topbar/Topbar'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { signlePostReducer } from '../../functions/reducer';
import { gettingReplies } from '../../functions/createcomment';
import Error from '../errors/Error';
import {BiArrowBack} from "react-icons/bi";
import { IconContext } from "react-icons";
import SinglePageContext from "./SinglePageContext"
import { useContext } from 'react';
import { Action } from 'history';
import { useNavigationType } from 'react-router-dom';
import FullSinglePageContext from './FullSinglePageContext';

export default function SinglePost() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state}));  
    const {posto} = useContext(SinglePageContext)
    const {SavethePost} = useContext(FullSinglePageContext);
    const {ReturnThePost}  = useContext(FullSinglePageContext);
    const [comments, setcomments]=useState("")


    //Regarding SignlePost backend stuff bitch
   const{specificpost} = useParams();
   var SpecifiCertainPost = specificpost === undefined ? user.id : specificpost;
   const [{loading, error, singlepost},dispatch] = useReducer(signlePostReducer,{
     loading: false,
     singlepost: {},
     error: "",  
   });

    


  var navType = useNavigationType();
  useEffect(() => {
    if (navType === Action.Pop) {
      PopNoDataAvailable();
    }
    if (navType === Action.Push) {
      PushDataAvailbale();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navType]);



  const PopNoDataAvailable = async()=>{
    const NewPost = await ReturnThePost(SpecifiCertainPost)
    if (NewPost === undefined) {
      CertainPost();
      GettingComments();
    }else if (NewPost !== undefined){
        dispatch({
          type:"SIGNLEPOST_SUCCESS",
          payload: NewPost.singlepost,
        });
       setcomments(NewPost.comments)
    }

  }


  const PushDataAvailbale = ()=>{
    if (posto === undefined) {
      CertainPost();
    }else{
      dispatch({
        type:"SIGNLEPOST_SUCCESS",
        payload: posto,
      });
    } GettingComments();

  }




  const CertainPost = async()=>{
    try {
     
      dispatch({
        type:"SIGNLEPOST_REQUEST",
      });                                                                      
      
         const {data} = await axios.get(`${process.env.REACT_APP_NACKEND_URL}/getSpecificPost/${SpecifiCertainPost}`,{
          headers:{
          Authorization: `Bearer ${user.token}`,
        }
         });
        //  console.log(data)
         if(data.ok === false){
            console.log(data)
          navigate("/home")
         }else{
          dispatch({
            type:"SIGNLEPOST_SUCCESS",
            payload: data,
          });
         }
    } catch (error) {
      dispatch({
        type:"SIGNLEPOST_ERROR",
        payload: error.response.data.message,
      });
    }
  }
  console.log(loading)
  const skip = 0
  const GettingComments = async()=>{
    const comments = await gettingReplies(skip,SpecifiCertainPost, user.token);
    setcomments(comments)
  }



  const backbuttonProfile = ()=> {
    var backfunctionold = sessionStorage.getItem("backfuntion")
    if (backfunctionold === "true") {
      // user came from an internal link
      navigate(-1)
    }
    else {
      // user came from a bookmark or an external link
      navigate("/home")
    }
  }



  useEffect(() => {
    if (singlepost._id !== undefined && comments !== "") {
      const popop = {key: singlepost._id,singlepost,  comments}
      SavethePost(popop)
    } 
  }, [singlepost,comments]);

  

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
           
    {
      error &&
      <Error/>
    }       
    <Topbar/>
    <div id='backbuttoninSinglePost'>
           <div id='backbuttonFromProfile'  onClick={backbuttonProfile} >   
             <IconContext.Provider value={{ className: "global-class-name" }}>
             <BiArrowBack></BiArrowBack>
             </IconContext.Provider>
           </div>
           <div id='backbuttonSinglePostnameandid'>
            <span id='backbuttonprofilename'>Pat</span>
           </div>
    </div>
    <EverythingForSignlePost comments={comments} posts={singlepost} user={user}/>
    <PublishPost/>
    </>
    )
  }
  