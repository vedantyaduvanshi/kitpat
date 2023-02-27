import React, { useContext, useReducer, useState } from 'react'
import axios from 'axios';
import PublishPost from '../../components/everything/sendpost/PublishPost'
import Helmet from 'react-helmet';
import Topbar from '../../components/topbar/Topbar'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { signlePostReducer } from '../../functions/reducer';
import { gettingReplies } from '../../functions/createcomment';
import Left from '../../components/everything/leftsection/Left';
import Right from '../../components/everything/right/Right';
import PostFull2 from './PostFull2';
import PostFull from './components/PostFull';
import AllComments from './components/AllComments';
import "./components/subcomment.css"
import MoonLoader from "react-spinners/MoonLoader";
import {BiArrowBack} from "react-icons/bi";
import { IconContext } from "react-icons";
import SinglePageContext from './SinglePageContext';
import { Action } from 'history';
import { useNavigationType } from 'react-router-dom';
import FullSinglePageContext from './FullSinglePageContext';


export default function SpecificComment() {
    const navigate = useNavigate();
    const {posto} = useContext(SinglePageContext)
    const { user } = useSelector((state) => ({ ...state}));  


      const [CerainComment, setCerainComment]=useState()





  
 //Regarding SignlePost backend stuff bitch
  const{specificcomment} = useParams();
  var SpecifiCertainComment = specificcomment === undefined ? user.id : specificcomment;
  const [{loading, error, singlepost},dispatch] = useReducer(signlePostReducer,{
    loading: false,
    singlepost: {},
    error: "",
  });

  var navType = useNavigationType();
  useEffect(() => {
    if (navType === Action.Pop) {
      // PopNoDataAvailable();
    }
    if (navType === Action.Push) {
      // PushDataAvailbale();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navType]);



  const [stopit, setstopit]=useState(false)
  useEffect(() => {
      if (stopit  === false) {
        console.log(singlepost)
          CertainPost();
          GettingComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[SpecifiCertainComment]);

//  console.log(loading, error)


  const CertainPost = async()=>{
    try {
     
      dispatch({
        type:"SIGNLEPOST_REQUEST",
      });                                                                      
      
         const {data} = await axios.get(`${process.env.REACT_APP_NACKEND_URL}/comment/${SpecifiCertainComment}`,{   
          headers:{
          Authorization: `Bearer ${user.token}`,
        }
         });
         if(data.ok === false){
            console.log(data)
          navigate("/home")
         }else{
          dispatch({
            type:"SIGNLEPOST_SUCCESS",
            payload: data,
          });
          setCerainComment(data.certainComment)
         }
         setstopit(true)
    } catch (error) {
      dispatch({
        type:"SIGNLEPOST_ERROR",
        payload: error.response.data.message,
      });
    }
  }

  const skip = 0
  const [comments, setcomments]=useState("")
  const [commentloading, setcommentloading]=useState(true)
  const GettingComments = async()=>{
    setcommentloading(true)
    const comments = await gettingReplies(skip,SpecifiCertainComment, user.token);
    setcomments(comments)
    setcommentloading(false)
  }

    //Getting liked from session
    const [LogedInUserLikesPosts, setLogedInUserLikesPosts]=useState(false)

    useEffect(()=>{
      var LogedInUserLikesPosts1 = sessionStorage.getItem("getUsersPostLiked")
      var LogedInUserLikesPosts2 = JSON.parse(LogedInUserLikesPosts1)
      setLogedInUserLikesPosts(LogedInUserLikesPosts2)
      setfinalresultStyle(false)
    },[])
  
    
  

console.log(error)

  //Ifconfuse check Network
  const [finalresultStyle, setfinalresultStyle]=useState(false)
  

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


  const {SavethePost} = useContext(FullSinglePageContext);
  useEffect(() => {
    if (singlepost.certainComment !== undefined) {
      const popop = {key: singlepost.certainComment._id,singlepost,comments}
      SavethePost(popop)
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
           
   
    <Topbar/>
    <div id='backbuttoninSinglePost'>
           <div id='backbuttonFromProfile'  onClick={backbuttonProfile} >   
             <IconContext.Provider value={{ className: "global-class-name" }}>
             <BiArrowBack></BiArrowBack>
             </IconContext.Provider>
           </div>
           <div id='backbuttonSinglePostnameandid'>
            <span id='backbuttonprofilename'>Reply</span>
           </div>
    </div>
    <div id="HomeEverything" >
     <Left/>
     <div id="HomeCenterposts">
      <div id="WelcomeorEmpty0"></div>

      {
        loading && commentloading &&
        <div id='postBoxforLoader'>
         <MoonLoader color='#00EEFF' size={30} />
        </div>
      }
      {
        singlepost.mainPostWas &&
        <PostFull2 LogedInUserLikesPosts={LogedInUserLikesPosts} post={singlepost.mainPostWas}    user={user} />
      }
      {
        singlepost.finalresult &&
        <>
        {singlepost.finalresult.reverse().map((post)=> (<AllComments LogedInUserLikesPosts={LogedInUserLikesPosts} finalresultStyle={finalresultStyle} key={singlepost.finalresult._id}  post={post} user={user} />  ))}
        </>
      }

      {
        CerainComment &&
        <PostFull LogedInUserLikesPosts={LogedInUserLikesPosts} post={CerainComment} finalresultStyle={finalresultStyle}   comments={comments}  user={user}   />
      }
    </div>
     <Right/>
   </div>
    <PublishPost/>
    </>
    )
  }
  