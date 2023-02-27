import React from 'react'
import ProfileButtons from './ProfileButtons';
import WhoToFollow from '../leftsection/WhoToFollow'
export default function Right() {

  return (
<div id="BossRightSection" >
        <div id="rightprofilesection">
          <ProfileButtons/>
          <WhoToFollow/>
        </div> 
    </div>
  )
}
