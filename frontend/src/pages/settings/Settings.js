import React from 'react'
import Helmet from 'react-helmet';
import PublishPost from '../../components/everything/sendpost/PublishPost';
import Topbar from '../../components/topbar/Topbar';
import "./setting.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import Cookies from 'js-cookie';
import AccountSetting from '../../components/settingsComponent/AccountSetting'
import SecuritySetting from '../../components/settingsComponent/SecuritySetting'
import DisplaySetting from '../../components/settingsComponent/DisplaySetting'
import LanguageSetting from '../../components/settingsComponent/LanguageSetting'
import HelpSetting from '../../components/settingsComponent/HelpSetting'

import { useState } from 'react';

export default function Settings() {
  const [account, setAccount]=useState(true);
  const [security, setSecurity]=useState("");
  const [display, setDisplay]=useState("");
  const [language, setLanguage]=useState("");
  const [help, setHelp]=useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout =()=>{
      sessionStorage.removeItem('pageView');
      Cookies.set("user", "")
    dispatch({
      type:'LOGOUT',
    });
    navigate("/");
    }



  function AccountShow(){
    setAccount(true);
    setSecurity(false);
    setDisplay(false);
    setLanguage(false);
    setHelp(false);
  }
  
  function SecurityShow(){
    setSecurity(true);    
    setAccount(false);
    setDisplay(false);
    setLanguage(false);
    setHelp(false);
  }

  function DisplayShow(){
    setDisplay(true);    
    setAccount(false);
    setSecurity(false);
    setLanguage(false);
    setHelp(false);
  }


  function LanguageShow(){
    setLanguage(true);    
    setAccount(false);
    setSecurity(false);
    setDisplay(false);
    setHelp(false);
  }

  function HelpShow(){
    setHelp(true);    
    setAccount(false);
    setSecurity(false);
    setDisplay(false);
    setLanguage(false);
  }



  return (
<>
<React.Fragment>
         <Helmet>
             <style>
                {`
                 body {
                  height: auto;
                  background-color: #192824;
                  overflow-y: auto;
                  overflow-x: hidden;
                  }

                  *::-webkit-scrollbar {
                    width: 11px;
                  }
                  
                  *::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.137);
                    border-radius: 10px;
                  }
                  
                  *::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 234, 255, 0.705);
                    border-radius: 10px;
                    border: 3px solid #ffffff00;
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

       <Topbar/>
       <PublishPost/>
       <div id='SettingsEverything'>
            <div id='NavigationSettings'>
            <Link  to="/home"><button  type="button">Back</button></Link>
                <h2>Settings</h2>
                <hr id='topmar' />
                <div style={{color: account ? 'rgb(0, 238, 255)' : 'white'}}onClick={AccountShow}>Account <span id='arrow'></span></div>
                <div style={{color: security ? 'rgb(0, 238, 255)' : 'white'}}onClick={SecurityShow}>Security <span id='arrow'></span></div>
                <div style={{color: display ? 'rgb(0, 238, 255)' : 'white'}}onClick={DisplayShow}>Display <span id='arrow'></span></div>
                <div style={{color: language ? 'rgb(0, 238, 255)' : 'white'}}onClick={LanguageShow}>Language <span id='arrow'></span></div>
                <div style={{color: help ? 'rgb(0, 238, 255)' : 'white'}}onClick={HelpShow}>Help <span id='arrow'></span></div>
                <div onClick={()=>{logout();}} to="/setting">Logout <span id='arrow'></span></div>

            </div>
            <hr id='betweenhr' />
            <div id='DisplaySettings'>
             {account && <AccountSetting/>}
             {security && <SecuritySetting/>}
             {display && <DisplaySetting/>}
             {language && <LanguageSetting/>}
             {help && <HelpSetting/>}
            </div>
       </div>
       
</>
  )
}
