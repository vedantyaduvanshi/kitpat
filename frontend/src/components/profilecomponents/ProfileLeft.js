import React, { useRef, useState } from 'react'
import Moment from 'react-moment';
import {  useNavigate } from "react-router-dom";
import { uploadImages } from '../../functions/uploadImages';
import { updateprofilePicture } from '../../functions/user';
import  ProfilePicChange  from '../profilePicture/ProfilePicChange'
import KitPatLoader from '../forLoadingKitpatBlur/KitPatLoader';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import FollowUnfollowKr from './FollowUnfollowKr';
import UserList from './UserList';
import {BiArrowBack} from "react-icons/bi";
import { IconContext } from "react-icons";



export default function ProfileLeft({profile, user}) {
  const dispatch= useDispatch();

  
//Veryy Important checking whether visitor is user or Guest
var visitor = profile?._id === user.id ? true : false

  //sHOW UNSHOW profile crop window
  const [editProfilePicture, seteditProfilePicture] = useState(false);
  //Editing Bio For profile
   //Ref for using emoji in text area
    const textRef = useRef(null);
  //Character Counting
   const [count, setCount] = React.useState(0);
   //ProfilePic image
   const [ProfilePic, setProfilePic] = useState([])
 //Show Unshow EdIT pROFILE wINDOW
  const [editProfile, seteditProfile] = useState(false);
  //Erro in selecting Profile pic
  const [ErrorPic, setErrorPic] = useState(false);
    //Loading 
  const [Loading, setLoading] = useState(false);
  ///Show Fullpage ProfilePic
  const [FullPagePic, setFullPagePic] = useState(false);

  ///Show follow unfollow users list
const [FollowUnfoolowUserList, setFollowUnfoolowUserList] = useState(false);


  //Edit PRofile Function
const editProfileFunction = () => {
  seteditProfile(true)
  document.body.style.overflowY = "hidden";
};

const CloseeditProfileFunction = () =>{
  document.body.style.overflowY = "auto";
  setInfos({...Infos,bio: details?.bio , github: details?.github, linkdin: details?.linkdin, twitter: details?.twitter, youtube: details?.youtube })
  setNewName({...NewName,name: profile?.first_name })
  setProfilePic([]);
  seteditProfile(false)
}





      // Disappear the error message after some sec

      function disappear(){
        setTimeout(() => {
          setErrorPic("");
        }, 2000)
      }



//Handling Selcted Image
const imageInputRef = useRef(null)
const handleImages = (e) => {
  let files = Array.from(e.target.files);
  if (files.length < 2 || !files.length === 0) {
    setErrorPic("")
    files.forEach((img)=>{
      if(
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" && 
        img.type !== "image/gif"
        ){
          setErrorPic("File format not supported");
        disappear();
        files = files.filter((item) => item.name !== img.name);
        return;
      }else if(img.size > 1024 * 1024 * 5){
        setErrorPic("Too large. Max Limit: 5mb.");
        disappear();
        files = files.filter((item) => item.name !== img.name);
        return;
      }
      console.log(files)
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload=(readerEvent)=>{
        setProfilePic((images)=> [...images, readerEvent.target.result])
      };
      seteditProfilePicture(true)
    });
  }else{
    setErrorPic("Error Picture:Max Limit: 1")
     disappear();
     setProfilePic([]);
  }
  } 




///Checking Entry done by user in Profile edit section
  


  //Connecting to server anfd Updating Profile Information


  const updateProfileInformation = async()=>{
    console.log(Infos)
    setLoading(true)
    if (ProfilePic.length > 0) {
      try {
        let img =  ProfilePic;
        let blob = await fetch(img).then((b) => b.blob())
        const path = `${user.username}/profile_pictures`;
        let formData = new FormData();
        formData.append("file", blob);
        formData.append("path", path);
        const res = await uploadImages(formData, path, user.token);
        const updated_picture = await updateprofilePicture(res[0].url,user.token);
        if (updated_picture === "ok") {
          console.log("Done changing Picture")
          Cookies.set('user',JSON.stringify({...user,picture:res[0].url}));
          dispatch({
            type:'CHANGEPIC',
            payload:res[0].url,
          });
          if (
            Infos.bio !== details.bio || 
            Infos.github !== details.github ||
            Infos.linkdin !== details.linkdin ||
            Infos.twitter !== details.twitter ||
            Infos.youtube !== details.youtube ||
            NewName.name !== profile.first_name
            ) {
              updateDetails();
          }else{
            setLoading(false)
            seteditProfile(false)
            window.location.reload();
          }
        }else{
          setErrorPic(updated_picture)
          setLoading(false)
        }
        
      } catch (error) {
        setErrorPic(error.response.data.error);
        setLoading(false)
      }
    }else if(
      Infos.bio !== details.bio || 
      Infos.github !== details.github ||
      Infos.linkdin !== details.linkdin ||
      Infos.twitter !== details.twitter ||
      Infos.youtube !== details.youtube ||
      NewName.name !== profile.first_name
    ){
      updateDetails();
    }else{
    setLoading(false)
    seteditProfile(false)
    }
  }




  const details = profile?.details
  const initial = {
    bio: details?.bio ? details.bio : "",
    github: details?.github ? details.github : "",
    linkdin: details?.linkdin ? details.linkdin : "",
    twitter: details?.twitter ? details.twitter : "",
    youtube: details?.youtube ? details.youtube : "",
  };
  const NewNameInitial ={
    name: profile?.first_name ? profile.first_name: "",
    }
  const [Infos, setInfos] = useState(initial)
  const [NewName, setNewName] = useState(NewNameInitial)

  useEffect(() =>{
    setInfos({...Infos,bio: details?.bio ,github: details?.github, linkdin: details?.linkdin,twitter: details?.twitter,youtube: details?.youtube })
    setNewName({...NewName,name: profile?.first_name })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[profile])
  const handleBioChange = (e) =>{
    setInfos({...Infos,bio: e.target.value})
    setCount(e.target.value.length)
  }
  const handleGithubChange= (e) =>{
    setInfos({...Infos,github: e.target.value})
  }
  const handleLinkdinChange= (e) =>{
    setInfos({...Infos,linkdin: e.target.value})
  }
  const handleTwitterChange= (e) =>{
    setInfos({...Infos,twitter: e.target.value})
  }
  const handleYoutubeChange= (e) =>{
    setInfos({...Infos,youtube: e.target.value})
  }

  const handleNameChange= (e) =>{
    setNewName({...NewName,name: e.target.value})
  }


const updateDetails = async () => {
  try {
    const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/updatedetails`,
      {
        Infos,NewName
      },{
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
    )
    console.log(data)
    setLoading(false)
    seteditProfile(false)
    window.location.reload();
  } catch (error) {
    setErrorPic(error.response.data.error);
    setLoading(false)
    console.log(error)
    console.log(error.response.data.message)
  }
}

const navigate = useNavigate();

const backbuttonProfile = ()=> {
  var backfunctionold = sessionStorage.getItem("backfuntion")
  if (backfunctionold === "true") {
    // user came from an internal link
    navigate(-1)
  }
  else {
    // user came from a bookmark or an external link
    navigate("/home")
  }
}


  return (
    <>
    {
       Loading && <KitPatLoader/>
    }
    {
      editProfilePicture  && <ProfilePicChange seteditProfilePicture={seteditProfilePicture} ProfilePic={ProfilePic} setProfilePic={setProfilePic}/>
    }
    {
      editProfile &&
      <>
       <div id='BlurProfile'></div>
       <div id='changeProfileValues'>

        <h2>Edit Profile</h2>
        <hr id='FirstHrofProfileedit' />

         <div id='ChangeProfilePic'>

           {
            ProfilePic.length !== 0 &&  <img src={ProfilePic} alt="" />
           }
           {
            ProfilePic.length === 0 &&  <img src={profile?.picture} alt="" />
           }
           <input type="file" accept="image/jpeg,image/png,image/webp,image/gif"  hidden  ref={imageInputRef} onChange={handleImages}/>
           <button onClick={()=>{imageInputRef.current.click()}}>Change Picture</button>
         </div>

         <div id='ChangeName'>
           <span>Name</span>
           <input  required name='name'  value={NewName?.name}  onChange={handleNameChange}  type="text" />
         </div>

         <div id='ChangeBio'>
           <span>Bio</span>
           <textarea ref={textRef}  maxLength="400" value={Infos?.bio}  name="bio" id="" cols="30" rows="10"  onChange={handleBioChange} ></textarea>
         </div>
         <div id="characCountinProfile"> <span>{count}</span>/400</div>


         <div id='LinkForSocials'>
         
           <div id='ChangLinksHere'>
           <span>GitHub</span>
           <input  value={Infos?.github}  onChange={handleGithubChange} name="github" type="text" />
           </div>

         
           <div id='ChangLinksHere'>
           <span>Linkedin</span>
           <input  value={Infos?.linkdin}  onChange={handleLinkdinChange} name="linkdin" type="text" />
           </div>

           <div id='ChangLinksHere'>
           <span>Twitter</span>
           <input value={Infos?.twitter}  onChange={handleTwitterChange} name="twitter"  type="text" />
           </div>

           <div id='ChangLinksHere'>
           <span>Youtube</span>
           <input  value={Infos?.youtube}  onChange={handleYoutubeChange} name="youtube" type="text" />
           </div>
         </div>
         <hr id='secondHrofProfileedit' />
         <div id='ButtonsProfileEdit'>
          <button  onClick={CloseeditProfileFunction} id='CancelProfieeDIT'>Cancel</button>
          <button onClick={() => updateProfileInformation()} id='ApplyProfilEdit'>Save</button>
         </div>
         {
           ErrorPic && <div id='ErrorUpdatingPRofile'>{ErrorPic}</div>
         }
       </div>     
       </>
    }













 {
  FullPagePic && 
  <>
   <div onClick={()=> setFullPagePic(false)} id='fullpagepicbackground' ></div>
   <img id='fullpagePic' src={profile?.picture} alt="" />
  </>
 }

      {
        FollowUnfoolowUserList &&  <UserList profileid={profile._id}  user = {user} setFollowUnfoolowUserList={setFollowUnfoolowUserList}/>
       }

       <div id='backbuttonofprofile'>
           <div id='backbuttonFromProfile' onClick={backbuttonProfile}>   
             <IconContext.Provider value={{ className: "global-class-name" }}>
             <BiArrowBack></BiArrowBack>
             </IconContext.Provider>
           </div>
           <div id='backbuttonprofilenameandid'>
            <span id='backbuttonprofilename'>{profile?.first_name}</span>
            <span id='backbuttonprofileid'>@{profile?.username}</span>
           </div>
       </div>


    <div id="ProfileLeftSection">
            
    <div id="mainProfileLeft">
      <div id='PerksProfile'>
        <div id='UserPerks'>
          <img src="../assets/award.png" alt="" />
        </div>
      </div>
     <img id='ProfilePictureinProfilePage' onClick={()=> setFullPagePic(true)} src={profile?.picture} alt=""/>
     <img id='PicforCreatingShadow' src={profile?.picture} alt=""/>
     <h2>{profile?.first_name}</h2> 
     <div id='usernameOfUser'>@<span>{profile?.username}</span></div>
     {
       !visitor && profile?.followingBackorNot?.followingBack && <span id='followsyouback'>Follows you</span>
     }
     <span id='KitpatJoinedDate'>Joined <Moment fromNow>{profile?.createdAt}</Moment></span>
       <div id="reputationNameUserProfile" >
        {profile?.reputationLevel}
       </div>
       <div id="reputationNumberUserProfile">
       {profile?.reputationNumber}
       </div>
       <div id="FollowFollowingandNumberofPosts" >
        <div id="NumberOfPosts" > <span>{profile?.posts?.length}</span> Posts</div>
        <div onClick={()=> setFollowUnfoolowUserList(true)} id="NumberOfFollowers"> <span>{profile?.followers?.length}</span> Followers</div>
        <div onClick={()=> setFollowUnfoolowUserList(true)} id="NumberOfFollowing" ><span>{profile?.following?.length}</span> Following </div>
       </div>
       



       
       {
      !visitor &&  
       <FollowUnfollowKr profileid={profile._id}  user = {user} followornott = {profile?.followingorNot?.following} />
       }

     {

     }


     {
      visitor &&  
      <button onClick={editProfileFunction} id="EditProfilePage">Edit Profile</button> 
     }
    
{/*  
        {
          profile && console.log(profile._id)
        } */}

       <div id="User_Description" >
       {details?.bio} 
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Non similique, ad officiis quis ratione libero consequuntur aut harum distinctio fuga id dignissimos impedit voluptatibus quae voluptates nostrum ab nam ex necessitatibus recusandae perspiciatis corrupti eligendi natus consectetur. Quos, laboriosam distinctio. Atque ullam nemo corporis quidem suscipit, architecto enim odit quam?
       </div>
          <div id="ProfileLinkedsocials">


         <a href={details?.github} target="_blank"  rel="noopener noreferrer"><div>
         <img src="../assets/github.png" alt=""/>
         </div>
         </a>

         <a href={details?.linkdin} target="_blank" rel="noopener noreferrer">
         <div>
         <img src="../assets/linked-in.png" alt=""/>
         </div>
         </a>

         <a href={details?.twitter} target="_blank" rel="noopener noreferrer">
         <div>
         <img src="../assets/twitter.png" alt=""/>
         </div>
         </a>


         <a href={details?.youtube} target="_blank" rel="noopener noreferrer">
         <div>
         <img src="../assets/youtube.png" alt=""/>
         </div>
         </a>


          </div>
    </div>


</div>
</>
  )
}
