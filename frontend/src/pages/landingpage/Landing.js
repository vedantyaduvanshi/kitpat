import React from 'react'
import Helmet from 'react-helmet';
import "./landing.css"
import { Link } from "react-router-dom";

export default function Landing() {

  return (
    <>
<React.Fragment>
         <Helmet>
             <style>
                {`
                 body {
                    height: 4000px;
                    background-color: #192824;
                  }
 

                  :root {
                    --shadow-color: #44d62c;
                    --shadow-color-light: #44d62c;
                  }
                  
                  * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }
                  
                  
                  *::-webkit-scrollbar {
                    width: 2px;
                  }
                  
                  *::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.137);
                  }
                  
                  *::-webkit-scrollbar-thumb {
                    background-color: rgb(255, 255, 255);
                    border-radius: 10px;
                    border: 3px solid #ffffff00;
                  }
                
                `}
            </style>
         </Helmet>
     
         </React.Fragment>




    <nav id="LandingNav" >
        <div id="Landingleft">
            {/* <a to="/home">Home</a> */}
            <Link to="/home">Home</Link>
        </div>
        <div id="LandingRight">
            
            <Link  id="signup" to="/register">SignUp</Link>
            <Link id="signin" to="/login">SignIn</Link>
        </div>
    </nav>
        <img id='kitpatLogo' src="../assets/kitpatlogo.png" alt="" />
    <div id="LandingTitle">

        <h1>KitPat</h1>
        <img id="rocket" src="../assets/rocket.png" alt=""/>
    </div>
    
    <div id="tagline">
    <span  >Build Share Grow</span>
    <div id="down_arrow">&raquo;</div>
    </div>

  <hr id="hr2"/>


  <div id="Explain">
      <div id="what">
       <h1>What is <span>KITPAT</span> ?</h1>
      </div>
      <div id="Define" >
<p>"KitPat" is a online platform that aims to <span id="orange" >empower</span>  the <span id="orange" > relentless & restless </span> Builder in you !</p>
      </div>
      
      <iframe  title="My Daily Marathon Tracker" src=""  allowFullScreen></iframe>

  </div>
  </> 
  )
}
