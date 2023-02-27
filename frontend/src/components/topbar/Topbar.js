import React, { useState } from 'react'
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";

import SearchMenu from './SearchMenu';
import Notifications from './Notifications';

export default function Topbar() {
 const [showSearchMenu, setShowSearchMenu]=useState(false)
 const [showNotifications, setShowNotifications]=useState(false)
 const {user} = useSelector((user)=>({...user}))
  
    function PencilClicked(){
        const popupshow = document.querySelector('#popup');
        popupshow.style.visibility = 'visible';
        document.body.style.overflowY = "hidden";
        const backgroundblur = document.querySelector('#JustToBlur');
        backgroundblur.style.visibility = 'visible';
        backgroundblur.style.backdropFilter = " blur(15px)";
    }
 
    return (
        
    <nav id="Navigation">
    <div id="left">
        <Link to="/home">KitPat</Link>
    </div>
    <div id="search">
        <input onClick={()=>{setShowSearchMenu(true)}} id="searchInput" autoComplete='off' type="text" placeholder="Search.."/>
        {showSearchMenu &&(
         <SearchMenu setShowSearchMenu={setShowSearchMenu} />
         )}
       
    </div>

    <div onClick={PencilClicked} id="postPencil">
        <img src= "../assets/pencil.png" alt=""/>
    </div>
    <div onClick={()=>{setShowNotifications(true)}} id="imgandname">
        <div id="image">
            <img src= {user?.picture} alt=""/>
            <div id="notifications">0</div>
           {showNotifications &&(
             <Notifications setShowNotifications={setShowNotifications} />
            )}
        </div>

        <div id="name">
            <span>{user?.username}</span>
        </div>
        
    </div>
</nav>
  )
}

