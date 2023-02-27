import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import "./verifyaccount.css"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function VerifyAccount() {
  const { user } = useSelector((state) => ({ ...state}));  
  const [error, setError]=useState("");
  const [success, setSuccess]=useState("");
  const sendVerificationLinkAgain= async()=>{
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_NACKEND_URL}/resendVerification`,{},{
        headers:{
          Authorization : `Bearer ${user.token}`
        },
      });
      setSuccess(data.message)
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  const navigate = useNavigate();
  const checkifverifiedfromBackend= async()=>{
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_NACKEND_URL}/checkifverfied`,{},{
        headers:{
          Authorization : `Bearer ${user.token}`
        },
      });
      if (data.message === true) {
        navigate("/home")
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    checkifverifiedfromBackend();
  });

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };



  
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
         <div id='VerifyAccountPageComponent' >
              <img src="../assets/mail.png" alt="" />
              <h2>Verification Link Sent</h2>
              <hr />
              <h4>Congratulations🎉! Your account has been created.</h4>
              <p>We've sent account verification link to your  email address.</p>
              <p>Please click on the link given in email to verify your account.</p>
              <button onClick={() => openInNewTab('https://mail.google.com/mail/u/0/#search/from%3A%40kitpatservices+in%3Aanywhere+newer_than%3A1d')} id='ContinuetoMail'> <img src="../assets/gmail.png" alt="" />Continue to Mail</button>
              <span id='lineVerifyAccount' >If you didn't receive email, <span onClick={()=>{
                sendVerificationLinkAgain();
              }}>click here</span> to resend the verification email.</span>
              <div id='hint' >Did the verification ? Just refresh the page to continue..</div>
              {success && <div id='successmailsend'>{success}</div>}
              {error && <div id='errormailsend'>{error}</div>}
         </div>

         



        </>
  )
}
