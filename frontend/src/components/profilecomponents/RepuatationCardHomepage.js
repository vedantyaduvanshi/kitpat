import React from 'react'

export default function RepuatationCardHomepage() {
  return (
<div id="ReputationCard">
      <h4>Current Reputation:</h4>
      <span id='reputatioNameHomepage'>Rooket</span>
      <span id='reputationStatHomepage'>3.5k</span>
      <div id="meter">
     <span style={{width:"35%"}} id='progress' ></span>
      </div>
      <div id='currentAndUpcoming'>
     <span id='currentRank' >Rooket</span>
     <span id='upcommingRank'>PatchReady</span>
     </div>
   <span id='How'>How it works?</span>
</div>
  )
}
