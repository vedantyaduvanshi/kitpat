import React, { useEffect, useState } from 'react'
import { ShowFollowers, ShowFollowwing,GetProfileFollowers, GetProfileFollowing } from '../../functions/user';
import "./userList.css"
import PulseLoader from "react-spinners/PulseLoader";
import FadeLoader  from "react-spinners/FadeLoader";
import Userbox from './Userbox';
import Userbox1 from './Userbox1';

export default function UserList({setFollowUnfoolowUserList, profileid, user }) {


  ///See or Not follow unfollow Block
    const [followersOrFollwingSee, setfollowersOrFollwingSee] = useState(false);
    

    //Followers and Following get stored here
    const [FollowersListHere, setFollowersListHere] = useState("");
    const [FollowingListHere, setFollowingListHere] = useState("");



    //Skips that  send to backend for endless scroll
    const [FollowersListSkip, setFollowersListSkip] = useState(0);
    const [FollowingListSkip, setFollowingListSkip] = useState(0);



    //Loading for Followers and Following
    const [FollowersLoading, setFollowersLoading] = useState(true);
    const [FollowingLoading, setFollowingLoading] = useState(true);


     // Response Loading for Followers and Following
     const [FollowersLoading1, setFollowersLoading1] = useState(true);
     const [FollowingLoading1, setFollowingLoading1] = useState(true);


    const ShowlistFollowers = async()=>{
      const Followers = await ShowFollowers(FollowersListSkip,profileid, user.token);
      if (Followers.length === 0 ) {
        setFollowersLoading(false)
      }else if(Followers.length < 9){
        setFollowersLoading(false)
      }
  
      setFollowersListHere([...FollowersListHere, ...Followers])
      setFollowersLoading1(false)
    }



    const ShowlistFollowwing = async()=>{
      const Followwing = await ShowFollowwing(FollowingListSkip,profileid, user.token);
      if (Followwing.length === 0 ) {
        setFollowingLoading(false)
      }else if(Followwing.length < 9){
        setFollowingLoading(false)
      }
      setFollowingListHere([...FollowingListHere, ...Followwing])
      setFollowingLoading1(false)
    }




    const [LoggedInUserFollowers, setLoggedInUserFollowers] = useState("");
    const getLogedinUserFollower = async()=>{
      var LoggedInUserFollowers1 = sessionStorage.getItem("LogedinUsersFollowers")
      var LoggedInUserFollowers2 = JSON.parse(LoggedInUserFollowers1);
      setLoggedInUserFollowers(LoggedInUserFollowers2)
    }


    
    const [LoggedInUserFollowing, setLoggedInUserFollowing] = useState("");
    const getLogedinUserFollowing = async()=>{
      var LoggedInUserFollowing1 = sessionStorage.getItem("LogedinUsersFollowwing")
      var LoggedInUserFollowing2 = JSON.parse(LoggedInUserFollowing1);
      setLoggedInUserFollowing(LoggedInUserFollowing2)
    }


    
    




    useEffect(()=>{
      ShowlistFollowers();
      ShowlistFollowwing()
      getLogedinUserFollower()
      getLogedinUserFollowing()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])


      useEffect(()=>{
        ShowlistFollowers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[FollowersListSkip])


        
      useEffect(()=>{
        ShowlistFollowwing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[FollowingListSkip])


        


     const  handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
          setFollowersListSkip(FollowersListHere.length)
          }
      }

   
      const  handleScroll2 = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
          setFollowingListSkip(FollowingListHere.length)
          }
      }



      
  
  return (
    <>
    <div onClick={()=> setFollowUnfoolowUserList(false)} id='blurtheBackInProfile'></div>
    <div id='UserListFollowUnfollow'>
      <div id='FollowersandFollowing'>
        <button id={followersOrFollwingSee ? '' : 'buttonActive'}
            onClick={()=> setfollowersOrFollwingSee(false)}
        >Followers</button>
        <button id={followersOrFollwingSee ? 'buttonActive' : ''}
            onClick={()=> setfollowersOrFollwingSee(true)}
        >Following</button>
      </div>
      {
            FollowersLoading1 &&  !followersOrFollwingSee &&     <FadeLoader color='#00EEFF' size={10} />
      }
      {
        !followersOrFollwingSee && 
        FollowersListHere &&
        <div id='FollowersList' onScroll={handleScroll}>
        {FollowersListHere.map((FollowersListHere ) => (<Userbox key={FollowersListHere._id} user={user} LoggedInUserFollowers ={LoggedInUserFollowers} LoggedInUserFollowing={LoggedInUserFollowing}   FollowersListHere={FollowersListHere}/>))}  
        {
          FollowersLoading &&  !followersOrFollwingSee &&  <PulseLoader color='#00EEFF' size={10} />
        }       
        </div>       
      
      }


       
      {
            FollowingLoading1 && followersOrFollwingSee &&  <FadeLoader color='#00EEFF' size={10} />
      }


      {
        followersOrFollwingSee &&
        FollowingListHere &&
        <div id='FolloweingList' onScroll={handleScroll2}>
         {FollowingListHere.map((FollowingListHere ) => (<Userbox1 key={FollowingListHere._id}   user={user} LoggedInUserFollowers ={LoggedInUserFollowers} LoggedInUserFollowing={LoggedInUserFollowing}  FollowingListHere={FollowingListHere}/>))}
         {
          FollowingLoading &&  followersOrFollwingSee && <PulseLoader color='#00EEFF' size={10} />
        }
        </div>
      }



    </div>
    </>
  )
}



