import React, {   useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Moment from "react-moment";
import PostMenu from '../../components/everything/center/PostMenu';
import { FiHeart } from "react-icons/fi";
import {FiVolumeX}from "react-icons/fi";
import { IconContext } from "react-icons";
import {FiVolume2}from "react-icons/fi";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { LikePost } from '../../functions/likingPost';
import "./components/postfull.css"
import Linkify from 'react-linkify';
import SinglePageContext from './SinglePageContext';





export default function Post({post,user,LogedInUserLikesPosts}) {


  const {ChangePost} = useContext(SinglePageContext);

  const [showPostMenu, setShowPostMenu]=useState(false)
  const [isActive, setIsActive] = useState(false);
 
  function stripProperty(o, v) {
    return  (delete o[Object.keys(o).splice(Object.values(o).indexOf(v), 1)])?o:0;
}  

  const handleClick = async()=>{
    if (isActive) {
      setLikesCounter(LikesCounter-1)
    }else if(!isActive){
      setLikesCounter(LikesCounter + 1)
    }
    if(LogedInUserLikesPosts?.likedPosts?.includes(post?._id)){
      stripProperty(LogedInUserLikesPosts.likedPosts,post._id)
      sessionStorage.setItem('getUsersPostLiked', JSON.stringify(LogedInUserLikesPosts));
   }else{
     LogedInUserLikesPosts.likedPosts.push(post._id)
     sessionStorage.setItem('getUsersPostLiked', JSON.stringify(LogedInUserLikesPosts));
   }
    setIsActive(current => !current);
    await LikePost(post._id, user.token);
  }



  const myvideo = useRef(null);

  const VisibilitySensor = require('react-visibility-sensor').default;

  function onChange (isVisible) {
    
    if (!isVisible) {
      myvideo?.current?.videoEl.pause();
    } else {
      myvideo?.current?.videoEl.play();
    }
  }

  const [VideoMuted, setVideoMuted] = useState(true);
  const toggleVolume = () => {
    myvideo.current.videoEl.muted = !myvideo.current.videoEl.muted
    setVideoMuted(!VideoMuted)
  };


    useEffect(()=>{
      CheckingPost();
      LikepostCounter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[LogedInUserLikesPosts,post])

  

  const CheckingPost = async()=>{
    if(LogedInUserLikesPosts?.likedPosts?.includes(post?._id)){
      setIsActive(true)
    }else{
      setIsActive(false)
    }
  }


  const [LikesCounter, setLikesCounter] = useState("0");

  
  const LikepostCounter = () => {
     setLikesCounter(post?.likes?.length)
  }


  const [FullPagePostPic, setFullPagePostPic] = useState(false);
  const [SelectedPostPic, setSelectedPostPic] = useState(false);


  const ClickedonPostImages = (e) => {
    setFullPagePostPic(true)
    setSelectedPostPic(e.target.src)
 }

 const navigate = useNavigate();
 
const savethepageview =()=>{
  ChangePost(post);
 navigate(`/pat/${post._id}`)
}



  return (
    <>  
   <div id='justSpaceinPostFull'></div>
                {
                  FullPagePostPic && 
                  <>
                <div onClick={()=> setFullPagePostPic(false)} id='fullpagepostimages' ></div>   
                    <img id='fullpagepostsPic' src={SelectedPostPic} alt="" />
                  </>
                }
 

        {
          showPostMenu && 
          <PostMenu setShowPostMenu={setShowPostMenu} post={post} userId={user?.id} postUserId={post?.user?._id}/>
        }
  <div id="postBox"  >
          
        <div id="PostProfilePic">
       <Link to={`/profile/${post?.user?.username}`} >  <img src={post?.user?.picture} alt="" /></Link>   
       <hr id='hehe'/>  
       </div>
    
        <div id="mainpost" >
          <div id='namerepuationtimeMenu'> 
            <Link  id="postUser_name" to={`/profile/${post?.user?.username}`}>{post?.user?.first_name}</Link>
            <span id='rankofuserinpost'>{post?.user?.reputationLevel}</span> 
            <span id='timeOfPost'>
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              </span> 
            <span id='usernameofPost'>@{post?.user?.username}</span>
            <div onClick={()=>{setShowPostMenu(true)}} id='PostMenu'>
            <span
                              style={{
                                backgroundColor: showPostMenu ? 'white' : '',
                              }}
            className="dot"></span>
            <span
                              style={{
                                backgroundColor: showPostMenu ? 'white' : '',
                              }}
            className="dot"></span>
            <span 
                              style={{
                                backgroundColor: showPostMenu ? 'white' : '',
                              }}
            className="dot"></span>
            </div>
          </div>

          <div id="postPara"> <p> <Linkify  options={{target:'blank'}}>{post.text}</Linkify></p>
          {
            post.images && post.images.length &&
            <div id={
              post.images.length ===1 ? "imageOnly1":
              post.images.length ===2 ? "imageOnly2":
              post.images.length ===3 ? "imageOnly3":
              post.images.length ===4 && "imageOnly4"
            }>
            {
              post.images.map((image, i)=>(
                <img onClick={ClickedonPostImages}  src={image.url} key={i} alt="" />
              ))
              
            }

            </div>
            
          }












          {
            post.video  &&
            <>
            <VisibilitySensor onChange={onChange}>
            <div id="videoInPost">


            <button id='buttonVolumeVideoPost' onClick={toggleVolume}>
            

            {
              !VideoMuted && post.video &&
              <IconContext.Provider value={{ className: "global-class-name" }}>
              <FiVolume2 ></FiVolume2>
              </IconContext.Provider>

            }

           {
            VideoMuted && post.video &&
            <IconContext.Provider value={{ className: "global-class-name" }}>
              <FiVolumeX></FiVolumeX>
            </IconContext.Provider>
           }
           
           </button>


            {
              post.video.map((video, i)=>(
                 <Video 
                 loop muted 
                 controls={['PlayPause', 'Seek', 'Time', 'Volume','Fullscreen']}
                 ref={myvideo} 
                 key={i}>
                 <source src={video.url}key={i} type="video/mp4" />
             </Video>
              ))
              
            }
            </div>
            </VisibilitySensor>
            </>
          }

           </div>

          <div id="LikeCommentShareReport">
            <div className='reactions' >
              <div  onClick={handleClick}
                className='buttonsBackground' >
                <FiHeart id={isActive ? 'heartLib2' : 'heartLib'}></FiHeart>
              </div>

              {
                isActive &&
                <span
                style={{
                 color: isActive ? 'rgb(0, 238, 255)' : '',
                }} 
             > {LikesCounter} </span>
              }
              {
                !isActive &&
                <span
                style={{
                 color: isActive ? 'rgb(0, 238, 255)' : '',
                }} 
             >{LikesCounter}</span>
              }
            </div>
            
            <div onClick={savethepageview} id='ClickonPost'>
            <div className='reactions'>
              <div  className='buttonsBackground' >
                <img src="../assets/comment.png" alt="" />
              </div>
              <span>{post?.comments?.length}</span>
            </div>
            </div>
            <div className='reactions' >
              <div className='buttonsBackground' >
              <img src="../assets/bookmark.png" alt="" />
              </div>
            </div>
            <div className='reactions'>
              <div className='buttonsBackground' >
              <img src="../assets/security.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
