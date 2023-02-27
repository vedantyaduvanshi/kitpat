import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { followUser, unfollowUser } from '../../functions/user';

export default function Userbox1({FollowingListHere, LoggedInUserFollowers, LoggedInUserFollowing , user}) {




  useEffect(()=>{
    CheckingFollowers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[LoggedInUserFollowers])

  useEffect(()=>{
    CheckingFollowing();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[LoggedInUserFollowing])


  const [UserFollowersorNot, setUserFollowersorNot] = useState(false);

  const CheckingFollowers = async()=>{
    if(LoggedInUserFollowers?._id === FollowingListHere?._id) {

      console.log(FollowingListHere?._id,"same")
    }else if(LoggedInUserFollowers?.followers?.includes(FollowingListHere?._id)) {
      setUserFollowersorNot(true)

    }else{
      setUserFollowersorNot(false)

    }
  }




  const [UserFollowingOrNot, setUserFollowingOrNot] = useState(0);

  const CheckingFollowing = async()=>{
    if(LoggedInUserFollowing?._id === FollowingListHere?._id) {
      setUserFollowingOrNot(3)
    }else if(LoggedInUserFollowing?.following?.includes(FollowingListHere?._id)) {
      setUserFollowingOrNot(1)

    }else{
      setUserFollowingOrNot(0)
    }
  }


  function stripProperty(o, v) {
    return  (delete o[Object.keys(o).splice(Object.values(o).indexOf(v), 1)])?o:0;
}  

  
  const unfollowtheuser = async()=>{
    setUserFollowingOrNot(0)
    stripProperty(LoggedInUserFollowing.following,FollowingListHere._id)
    sessionStorage.setItem('LogedinUsersFollowwing', JSON.stringify(LoggedInUserFollowing));
       console.log(LoggedInUserFollowing)
    await unfollowUser(FollowingListHere._id, user.token);
  }



  const followtheuser = async()=>{
    setUserFollowingOrNot(1)
    LoggedInUserFollowing.following.push(FollowingListHere._id)
    sessionStorage.setItem('LogedinUsersFollowwing', JSON.stringify(LoggedInUserFollowing));
       console.log(LoggedInUserFollowing)
    await followUser(FollowingListHere._id, user.token);
  }





  return (
    <div id='userboxFollowers'>
      
    <Link  to={`/profile/${FollowingListHere?.username}`}>
        <div  id='imgnameusernameInUserBox'>
            <img  src={FollowingListHere?.picture} alt="" />
            <span id='firstNameFollower'>{FollowingListHere?.first_name}</span>
            <span id='usernameFollower'>@{FollowingListHere?.username}</span>
          {
            UserFollowersorNot &&  <span id='FollowsyouorNot'>Follows you</span>
          }
          {/* {
            UserFollowersorNotLoader &&  <SkewLoader id='loaderinprofile' color='#00EEFF' size={10} />
          } */}

        </div>
        </Link>

        <div id='buttonInUserBox'>
          {
            UserFollowingOrNot === 1 &&  <button onClick={()=> unfollowtheuser()} id='UnfollowButtonFollowers'>Following</button>
          }
          {
            UserFollowingOrNot === 0 && <button onClick={()=> followtheuser()} id='FollowButtonFollowers'>Follow</button>
          }
          {
            UserFollowingOrNot === 3 && <span></span>
          }
       </div>
       
    </div>
  )
}
