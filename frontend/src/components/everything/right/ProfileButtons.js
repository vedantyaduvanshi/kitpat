import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import {AiFillHome}from "react-icons/ai";
import {FaUserAlt}from "react-icons/fa";
import {IoMdMail}from "react-icons/io";
import {BsBookmarkPlusFill}from "react-icons/bs";
import {IoSettings}from "react-icons/io5";

export default function ProfileButtons() {
  const navigate = useNavigate();
 
  return (
    <div id="profileButtons">

   <div onClick={()=> navigate("/home")} className='buttonofprofilebutton'>
    <div className='iconsofbuttonprofile'>
    <IconContext.Provider value={{ className: "profilebuttons" }}><AiFillHome/></IconContext.Provider>
    </div>
    <div className='profilebuttonName'>
      <span>Home</span>
    </div>
   </div>

   <div onClick={()=> navigate("/profile")} className='buttonofprofilebutton'>
    <div className='iconsofbuttonprofile'>
    <IconContext.Provider value={{ className: "profilebuttons" }}><FaUserAlt/></IconContext.Provider>
    </div>
    <div className='profilebuttonName'>
      <span>Profile</span>
    </div>
   </div>

   <div className='buttonofprofilebutton'>
    <div className='iconsofbuttonprofile'>
    <IconContext.Provider value={{ className: "profilebuttons" }}><IoMdMail/></IconContext.Provider>
    </div>
    <div className='profilebuttonName'>
      <span>Messages</span>
    </div>
   </div>

   <div className='buttonofprofilebutton'>
    <div className='iconsofbuttonprofile'>
    <IconContext.Provider value={{ className: "profilebuttons" }}><BsBookmarkPlusFill/></IconContext.Provider>
    </div>
    <div className='profilebuttonName'>
      <span>Bookmarks</span>
    </div>
   </div>

   <div onClick={()=> navigate("/setting")} className='buttonofprofilebutton'>
    <div className='iconsofbuttonprofile'>
    <IconContext.Provider value={{ className: "profilebuttons" }}><IoSettings/></IconContext.Provider>
    </div>
    <div className='profilebuttonName'>
      <span>Settings</span>
    </div>
   </div>
   </div>
  )
}
