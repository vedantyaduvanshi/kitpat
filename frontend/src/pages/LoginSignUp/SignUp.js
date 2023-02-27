import React from 'react'
import SignupComponent from '../../components/signupComponent/SignupComponent'
import "./signup.css"
import Helmet from 'react-helmet';
import { Link } from "react-router-dom";




export default function SignUp() {
  
  return (
<>
<React.Fragment>
         <Helmet>
             <style>
                {`
                 body {
                  height: auto;
                  background-color: #192824;
                 
                  overflow-x: hidden;
                  overflow-y: hidden;
                  }

                  *::-webkit-scrollbar {
                    width: 0px;
                  }

                  * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }

                `}
            </style>
         </Helmet>
     
         </React.Fragment>




      


<div id="SignUpEverything">
<img id='kitpatLogoinSignInSignUp' src="../assets/kitpatlogo.png" alt="" />
<div id="SignUpLeftSection">
            <div id="SignUpBackButton">
                <Link to="/"><button>Back</button></Link>
                </div>
            <div id="SignUpDetailsRight">
            <h1>Welcome</h1>
            <h2>To</h2>
            <h3 id="kitpatname">KITPAT</h3>
            <span>
                Build Share Review Grow.🚀
            </span>
            <img src= "./assets/growth2.svg"alt=""/>
        </div>
        </div>
        <SignupComponent/>
        
</div>
</>
  )
}
