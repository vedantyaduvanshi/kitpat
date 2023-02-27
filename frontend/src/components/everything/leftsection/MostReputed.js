import React, { useState } from 'react'

import "./mostReputated.css"
import ReputationBox from './ReputationBox';

export default function MostReputed() {

    const[Clickedone,setClickedonme] = useState(false);

  return (
    <div id="TopMostKats">
    <div id='LeaderBoardanExplore'>
        <div onClick={()=>setClickedonme(false)}
         style={{
            backgroundColor: Clickedone ? '#ffffff5d' : 'rgb(0, 238, 255)',
           }} 
        id='LeaderboardinHome'>Leaderboard</div>
        
        <div onClick={()=>setClickedonme(true)}
          style={{
            backgroundColor: Clickedone ? 'rgb(0, 238, 255)' : '#ffffff5d',
               }} 
        id='ExploreinHome'>Explore</div>
    </div>




   
    <div id='reputastionLeaderboardScollabble'>
        {
            !Clickedone &&  <ReputationBox/>
        }


   </div>



   




</div>
  )
}
