import React from 'react'
import ProfileLeft from './ProfileLeft'
import ProfileRight from './ProfileRight'
import RepuatationCardHomepage from './RepuatationCardHomepage'

export default function EveythingProle({profile, user}) {
  console.log(profile)
  return (
    <div id="HomeCenterposts">
        <ProfileLeft user={user} profile={profile} />
        <RepuatationCardHomepage/>
        <ProfileRight user={user} profile={profile}  posts={profile.posts}/>
  </div>
  )
}
