import React, { useEffect, useState } from 'react'
import { followUser, unfollowUser } from '../../functions/user';

export default function FollowUnfollowKr({ followornott, profileid, user }) {

     //unfollow Button Hovering Css
  const [isHovering, setIsHovering] = useState(false);
  const [followornot, setfollowornot] = useState();
  useEffect(()=>{
    setfollowornot(followornott)
  },[followornott])
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  //getting session storage
  useEffect(()=>{
    getLogedinUserFollowing()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    
    const [LoggedInUserFollowing, setLoggedInUserFollowing] = useState("");
    const getLogedinUserFollowing = async()=>{
      var LoggedInUserFollowing1 = sessionStorage.getItem("LogedinUsersFollowwing")
      var LoggedInUserFollowing2 = JSON.parse(LoggedInUserFollowing1);
      setLoggedInUserFollowing(LoggedInUserFollowing2)
    }


  function stripProperty(o, v) {
    return  (delete o[Object.keys(o).splice(Object.values(o).indexOf(v), 1)])?o:0;
}  
  const followtheuser = async()=>{
    LoggedInUserFollowing.following.push(profileid)
    sessionStorage.setItem('LogedinUsersFollowwing', JSON.stringify(LoggedInUserFollowing));
    setfollowornot(true)
    await followUser(profileid, user.token);
  }


  const unfollowtheuser = async()=>{
    stripProperty(LoggedInUserFollowing.following,profileid)
    sessionStorage.setItem('LogedinUsersFollowwing', JSON.stringify(LoggedInUserFollowing));
    setfollowornot(false)
    await unfollowUser(profileid, user.token);

  }

  return (
    <>
              {
                  followornot ? (
                    <div
                    id='showhenNotFollowed'> 
                    <img id='messageiconInProfile' src="../assets/markunread.png" alt="" /> 
                    <button onClick={()=> unfollowtheuser()} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} id="UnfollowButton">{isHovering && "Unfollow"}{!isHovering && "Following"}</button> 
                    </div>
                  )
                  : 
                  (
                    <div id='showhenNotFollowed'> <img id='messageiconInProfile' src="../assets/markunread.png" alt="" /> <button onClick={()=> followtheuser()} id="FollowButton">Follow</button></div>  
                 )
             }

     




    </>

  )
}
