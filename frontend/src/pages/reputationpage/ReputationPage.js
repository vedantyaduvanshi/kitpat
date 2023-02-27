import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import "./reputationpage.css"
import { Link } from "react-router-dom";
import Topbar from '../../components/topbar/Topbar';


export default function ReputationPage() {
    const [ChangeReputation, setChangeReputation]=useState(0)


    function plus1(){
        if (ChangeReputation < 5) {
            setChangeReputation(ChangeReputation + 1)
        }else{
            return;
        }
    }
    function minus1(){
        if (ChangeReputation > 0) {
            setChangeReputation(ChangeReputation - 1)
        }else{
            return;
        }
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
                    overflow-x: hidden;
                    overflow-y: auto;
                    }
    
                      *::-webkit-scrollbar {
                        width: 8px;
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
<div id='ReputationEverything'>
            <img id='RocketIMage' src="../assets/Saly-43.png" alt="" />
             <div id='BackbuttonDiv'>
             <Link  to="/home">Back</Link>
             </div>


    <div id='firstReputationBox'>
               <div id='boxforglowshadow'> <img id='BackImage' src="../assets/glowingBack.png" alt="" /></div>
                <div id='firstboxmainstuff'>
                 <h1>Reputation <span>by KITPAT</span></h1> 
                 <hr />
                 <div id='progressbarBoss'>
                     <div id='ReputationMeter'>
                        <span id='currentMeter'></span>
                        <div 
                        style={{
                        animation: ChangeReputation ===0 ? 'reputationanimation 0.6s infinite ' : '',
                        }}
                        id='firstRep'> <span>Rooket</span></div>
                        <div
                         style={{
                             animation: ChangeReputation ===1 ? 'reputationanimation 0.6s infinite ' : '',
                             }}
                         id='secondRep'> 
                         <span>PatchReady</span></div>
                        <div
                           style={{
                               animation: ChangeReputation ===2 ? 'reputationanimation 0.6s infinite ' : '',
                               }}
                        id='thirdRep'> <span>FetchKing</span></div>
                        <div
                          style={{
                           animation: ChangeReputation ===3 ? 'reputationanimation 0.6s infinite ' : '',
                           }}
                        id='fourthRep'> <span>Bagtect</span></div>
                        <div
                         style={{
                           animation: ChangeReputation ===4 ? 'reputationanimation 0.6s infinite ' : '',
                           }}
                        id='fifthRep'> <span>PrimeKat</span></div>
                        <div
                         style={{
                           animation: ChangeReputation ===5 ? 'reputationanimation 0.6s infinite ' : '',
                           }}
                        id='SixthRep'> <span>SupremeRegent</span></div>
                     </div>
                 </div>
                 <div id='CheckDifferentRanks'>
                    {
                        ChangeReputation === 0 && <div id='RooketReputationCard'></div>
                    }
                    {
                        ChangeReputation === 1 && <div id='RooketReputationCard'></div>
                    }
                    {
                        ChangeReputation === 2 && <div id='RooketReputationCard'></div>
                    } 
                    {
                        ChangeReputation === 3 && <div id='RooketReputationCard'></div>
                    }
                    {
                        ChangeReputation === 4 && <div id='RooketReputationCard'></div>
                    }
                    {
                        ChangeReputation === 5 && <div id='RooketReputationCard'></div>
                    } 
                 </div>
                 <div id='LeftRightBUttons'>
                   <button
                   style={{
                    backgroundColor: ChangeReputation ===0  ? 'rgba(240, 255, 255, 0.171)' : '',
                        }}
                   onClick={minus1}><span id='leftRep'></span></button>
                   <button 
                     style={{
                        backgroundColor: ChangeReputation ===5 ? 'rgba(240, 255, 255, 0.171)' : '',
                     }}
                   onClick={plus1}><span id='rightRep'></span></button>
                 </div>
                </div>
     </div>

     <div id='CurrentAndLeaderboard'>
      <div id='currrentRank'>Current Reputation: Rooket</div>
      <div id='RankLeaderboard'>WorldWide Reputation LeaderBoard</div>
     </div>



     <div id='secondReputationBox'>
                    <div id='secondboxpart1'>
                    </div>
                    <div id='secondboxpart2'>
                        <h1>Boost Your Reputation</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum.</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid.</p>
                       <button>Boost Reputation</button>
                        
                    </div>
     </div>



      <div id='thirdReputationBox'>
      </div>


</div>
    
</>    
  )
}
