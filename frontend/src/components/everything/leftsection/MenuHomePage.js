import React from 'react'
import {RiLightbulbFlashFill}from "react-icons/ri";
import { IconContext } from "react-icons";
import {IoGameController}from "react-icons/io5";
import {MdStars}from "react-icons/md";
import { useNavigate } from 'react-router-dom';


export default function MenuHomePage() {
  const navigate = useNavigate();
  return (
    <div id='menuhomepage'>
        <div className='menudivhomepage'>
            <div className='imgmenudivHome'>
            <IconContext.Provider value={{ className: "imgmenuHome" }}><RiLightbulbFlashFill/></IconContext.Provider>
            </div>
            <span>Hackathons</span>
        </div>
        <div className='menudivhomepage'>
        <div className='imgmenudivHome'>
            <IconContext.Provider value={{ className: "imgmenuHome" }}><IoGameController/></IconContext.Provider>
            </div>
            <span>1vs1 Battle</span>
        </div>
        <div onClick={()=> navigate("/reputation")} className='menudivhomepage'>
        <div className='imgmenudivHome'>
            <IconContext.Provider value={{ className: "imgmenuHome" }}><MdStars/></IconContext.Provider>
            </div>
            <span>Reputation</span>
        </div>
    </div>
  )
}
