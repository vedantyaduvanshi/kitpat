import React, { useEffect, useState } from 'react'
import { getProfileLikedPostsforShowcase } from '../../functions/user'
import Post from '../everything/center/Post'



export default function ProfileRight({posts, user, profile}) {



  const [LogedInUserLikesPosts, setLogedInUserLikesPosts]=useState(false)
  const [ProfileLIkedPosts, setProfileLIkedPosts]=useState()


  useEffect(()=>{
    var LogedInUserLikesPosts1 = sessionStorage.getItem("getUsersPostLiked")
    var LogedInUserLikesPosts2 = JSON.parse(LogedInUserLikesPosts1)
    setLogedInUserLikesPosts(LogedInUserLikesPosts2)
    },[])

    const [PatsorLikedPats, setPatsorLikedPats]=useState(false)


  const FollowingListSkip = 0
    const  gettingProfileLikedPosts = async()=>{
      setPatsorLikedPats(true)
      const ProfileLikedPosts = await getProfileLikedPostsforShowcase(FollowingListSkip,profile._id, user.token);
      const ProfileLikedPosts2 = ProfileLikedPosts.reverse();
      setProfileLIkedPosts(ProfileLikedPosts2)
    }

    const  seeAllYourPats = ()=>{
      setPatsorLikedPats(false)
    }


  return (
    <> 
    <div id="ProfileRightSection">


    <div id="NavigationforProfile">
        <div onClick={seeAllYourPats}
         style={{
          opacity: PatsorLikedPats ? '0.4' : '',
         }}
        id="ForYou2" >Pats </div>
        <div 
        onClick={gettingProfileLikedPosts}
         style={{
          opacity: PatsorLikedPats ? '' : '0.4',
         }}
        id="AllPosts2">Liked</div>

    </div>


    <div id="ProfilePosts">

        <div id="WelcomeorEmptyP">

        </div>

              {
                !PatsorLikedPats &&
                <>
                { posts && posts.length &&
                  posts.map((post)=> (<Post key={post._id} post={post} user={user} LogedInUserLikesPosts={LogedInUserLikesPosts} /> ))
                }
                </>
              }
              {
                PatsorLikedPats &&
                <>
                { ProfileLIkedPosts && ProfileLIkedPosts.length &&
                  ProfileLIkedPosts.map((post)=> (<Post key={ProfileLIkedPosts._id} post={post} user={user} LogedInUserLikesPosts={LogedInUserLikesPosts} /> ))
                }
                </>
              }
                
        

</div>
</div>


</>
  )
}
