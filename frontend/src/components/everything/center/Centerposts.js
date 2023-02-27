import React, { useEffect, useState } from "react";

import Post from "./Post";




export default function Centerposts({posts, user}) {

  const [LogedInUserLikesPosts, setLogedInUserLikesPosts]=useState(false)

  useEffect(()=>{
    var LogedInUserLikesPosts1 = sessionStorage.getItem("getUsersPostLiked")
    var LogedInUserLikesPosts2 = JSON.parse(LogedInUserLikesPosts1)
    setLogedInUserLikesPosts(LogedInUserLikesPosts2)
    },[])

  


  return (

    <div id="HomeCenterposts">
      <div id="WelcomeorEmpty0"></div>
        {posts.map((post)=> (<Post key={post._id}  LogedInUserLikesPosts={LogedInUserLikesPosts} post={post} user={user} /> ))}
    </div>
   
  );
}
