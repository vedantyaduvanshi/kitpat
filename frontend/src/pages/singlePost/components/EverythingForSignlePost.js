import React, { useEffect, useState } from 'react'

import Left from '../../../components/everything/leftsection/Left'

import Right from '../../../components/everything/right/Right'
import PostFull from './PostFull'
import "./../../loader.css"

export default function EverythingForSignlePost({posts, user,comments}) {



  //Getting liked from session
  const [LogedInUserLikesPosts, setLogedInUserLikesPosts]=useState(false)

  useEffect(()=>{
    var LogedInUserLikesPosts1 = sessionStorage.getItem("getUsersPostLiked")
    var LogedInUserLikesPosts2 = JSON.parse(LogedInUserLikesPosts1)
    setLogedInUserLikesPosts(LogedInUserLikesPosts2)
    setfinalresultStyle(true)
    },[])

  

    //////////////
    const [finalresultStyle, setfinalresultStyle]=useState(true)
    ////////

  return (
    <div id="HomeEverything" >
     <Left/>
     <div id="HomeCenterposts">
      <div id="WelcomeorEmpty0"></div>
      
      

       <PostFull post={posts} comments={comments} finalresultStyle={finalresultStyle} LogedInUserLikesPosts={LogedInUserLikesPosts}  user={user} />
      
    </div>
     <Right/>
   </div>
  )
}


