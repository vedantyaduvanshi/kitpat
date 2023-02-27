import React, {   useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from "react-moment";
import PostMenu from '../../../components/everything/center/PostMenu';
import { FiHeart } from "react-icons/fi";
import {FiVolumeX}from "react-icons/fi";
import { IconContext } from "react-icons";
import {FiVolume2}from "react-icons/fi";
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { LikeComment, LikePost } from '../../../functions/likingPost';
import Comments from './Comments';
import MoonLoader from "react-spinners/MoonLoader";
import Userbox from '../../../components/profilecomponents/Userbox';
import { getPostLikers } from '../../../functions/getpostLikers';
import Linkify from 'react-linkify';







export default function Post({post,user,comments, LogedInUserLikesPosts,finalresultStyle}) {



  //  Updating automatic scroll height





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
    if (finalresultStyle === false) {
      await LikeComment(post._id, user.token);
    }else{
      await LikePost(post._id, user.token);
    }
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
    setVideoMuted(myvideo.current.videoEl.muted)
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

  
  const LikepostCounter = async()=>{
     setLikesCounter(post?.likes?.length)
  }


  const [FullPagePostPic, setFullPagePostPic] = useState(false);
  const [SelectedPostPic, setSelectedPostPic] = useState(false);


  const ClickedonPostImages = (e) => {
    setFullPagePostPic(true)
    setSelectedPostPic(e.target.src)
 }





////////////////////
// Showing Users who liked the posts

const [LoadingParamerter1, setLoadingParamerter1] = useState(true);
const [LoadingParamerter2, setLoadingParamerter2] = useState(true);  
const [LoadingParamerter3, setLoadingParamerter3] = useState(true); 
const [LoadingParamerter4, setLoadingParamerter4] = useState(true); 
const [displayLikesDiv, setdisplayLikesDiv] = useState(false);
const [UserLikethePost, setUserLikethePost] = useState("");
const [UserLikedSkip, setUserLikedSkip] = useState(0);


useEffect(()=>{
  getLogedinUserFollower()
  getLogedinUserFollowing()
  // setfinalresultStyle(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [LoggedInUserFollowers, setLoggedInUserFollowers] = useState("");
  const getLogedinUserFollower = async()=>{
    var LoggedInUserFollowers1 = sessionStorage.getItem("LogedinUsersFollowers")
    var LoggedInUserFollowers2 = JSON.parse(LoggedInUserFollowers1);
    setLoggedInUserFollowers(LoggedInUserFollowers2)
    setLoadingParamerter3(false)
  }


  
  const [LoggedInUserFollowing, setLoggedInUserFollowing] = useState("");
  const getLogedinUserFollowing = async()=>{
    var LoggedInUserFollowing1 = sessionStorage.getItem("LogedinUsersFollowwing")
    var LoggedInUserFollowing2 = JSON.parse(LoggedInUserFollowing1);
    setLoggedInUserFollowing(LoggedInUserFollowing2)
    setLoadingParamerter4(false)
  }

  




const  handleScroll = (e) => {
const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
if (bottom) {
setUserLikedSkip(UserLikethePost.length)
 }
}


const ShowlistFollowwing = async()=>{
const PostLikers = await getPostLikers(UserLikedSkip,post?._id, user.token);
console.log(PostLikers)
if (PostLikers.length === 0 ) {
setLoadingParamerter2(false)
}else if(PostLikers.length < 9){
setLoadingParamerter2(false)
}
setUserLikethePost([...UserLikethePost, ...PostLikers])
setLoadingParamerter1(false)
}


const showtheUsers = ()=> {
if (UserLikethePost === "") {
ShowlistFollowwing();
}
setdisplayLikesDiv(true)
}


const hidetheUsers = ()=> {

setdisplayLikesDiv(false)
}
useEffect(()=>{
if (UserLikedSkip !== 0) {
ShowlistFollowwing();
}
// eslint-disable-next-line react-hooks/exhaustive-deps
},[UserLikedSkip])




  return (
    <>  
        {
      finalresultStyle &&
       <div></div>
    } 
    {
      finalresultStyle &&
      <div id='justSpaceinPostFull'></div>
    }
                {
                  FullPagePostPic && 
                  <>
                <div onClick={()=> setFullPagePostPic(false)} id='fullpagepostimages' ></div>   
                    <img id='fullpagepostsPic' src={SelectedPostPic} alt="" />
                  </>
                }
 

        {
          showPostMenu && 
          <PostMenu setShowPostMenu={setShowPostMenu} post={post} userId={user.id} postUserId={post.user._id}/>
        }


    {
        post.user === undefined &&
        <div id="postBoxforLoader" style={{height: "120px"}}>
                  <MoonLoader color='#00EEFF' size={25} />
        </div>
    }


{     post.user !== undefined &&
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
          {
            !finalresultStyle && 
            <div id='replyingtotext'>
            <p>Replying to </p>
     
     

      { post.replyingto.length === 2 &&
         <>
            <span  >@{post.replyingto[1]} and</span>
            <span  >@{post.replyingto[0]}</span>
        </>
      }

      { post.replyingto.length === 1 &&
         <>
            <span  >@{post.replyingto[0]}</span>
        </>
      }

      { post.replyingto.length >2 &&
         <>
            <span>@{post.replyingto[0]} and</span>
            <span>{post.replyingto.length - 1} others</span>
        </>
      } 

        </div>
          }
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
            
            <div  id='ClickonPost' >
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
      </div>}
      {
  displayLikesDiv &&
    <>
  <div onClick={hidetheUsers} id='blurtheBackGround'></div>
     <div id='WhoWhoLiked'>
       <div id='HeadingLikedBy'>
         <h2>Liked by</h2>
       </div>
        <hr id='lineafterLikedbyHEading' />

  <div id='LikedByLists' onScroll={handleScroll}>
  {
   LoadingParamerter1 &&
   LoadingParamerter3 &&
   LoadingParamerter4 &&
    <MoonLoader color='#00EEFF' size={20} />
  }

  {
  UserLikethePost &&
  <>
  {UserLikethePost.map((UserLikethePost) => (<Userbox key={UserLikethePost._id} user={user} LoggedInUserFollowers ={LoggedInUserFollowers} LoggedInUserFollowing={LoggedInUserFollowing}   FollowersListHere={UserLikethePost}/>))}  
  </>
  }
     
  {
  LoadingParamerter2 &&  <MoonLoader color='#00EEFF' size={22} />
  }
  </div>
    </div>
      </>
    }

    <div id='LikeCommentShareinDetail'>
      <div onClick={showtheUsers} ><span>{LikesCounter}</span> Likes</div>
      <div><span>{post.comments?.length}</span> Comments</div>
    </div>

      {
        comments === "" &&
        <div id="postBoxforLoader" >
                  <MoonLoader color='#00EEFF' size={30} />
        </div>
      }

      {
        comments !== "" &&
        <Comments comments={comments} post={post}  user={user}  LogedInUserLikesPosts={LogedInUserLikesPosts} /> 
      }
    </>

  )
}
