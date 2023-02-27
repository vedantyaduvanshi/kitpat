import React, { useRef } from 'react'
import { useState } from 'react'
import useClickOutside from "../../../helpers/ClickOutside"
import "./postmenu.css"
export default function PostMenu({userId,postUserId,post,setShowPostMenu}) {

    const postmenuref = useRef(null);
    useClickOutside(postmenuref,()=>{
        setShowPostMenu(false);
    })


    const [test, setTest] = useState(postUserId===userId ? true : false)

    console.log(setTest)
  return (
   <div id='Post3dotOPtions'  ref={postmenuref} >

    {test && 
    <>
    <div>Pin to your Profile<span></span></div>
    <hr />
    </>
    }


    { !test &&
    <>
     <div>Follow<span>@{post.user.username}</span></div>
     <hr />
     </>
    }


    {test &&
    <>
     <div>Delete This Pat <span></span></div>
     <hr />
     </>
    }

 

    {!test &&
    <>
     <div>Visit<span>@{post.user.username}</span></div>
     <hr />
     </>
    }


   {/* {//Those who aint require test and !test} */}
    {
        <>
        <div>Share<span></span></div>
        <hr />
        </>
    }
    {
        <>
        <div>Reputation -<span></span>{post.user.reputationLevel}</div>
        <hr />
        </>
    }


   {
    !test &&
    <>
    <div>Bookmark Pat<span></span></div>
    <hr />
    </>
   }

   {
    !test &&
    <>
    <div>Not interested in this Pat<span></span></div>
    <hr />
    </>
   }

   {
    !test &&
    <>
    <div>Report Pat<span></span></div>
    <hr />
    </>
   }






{/* {For these first work on follow unfollow stuff and pin to profile stuff} */}
       {/* <div>Unpin from Profile<span></span></div>
    <hr /> */}
    {/* <div>Unfollow<span>@{post.user.username}</span></div> */}

   </div>
  )
}
