import React from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import SignUp from "./pages/LoginSignUp/SignUp";
import Login from "./pages/LoginSignUp/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profilepage/Profile";
import Landing from "./pages/landingpage/Landing";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import Acttivate from "./pages/home/Acttivate";
import VerifyAccount from "./pages/activateAccount/VerifyAccount";
import ResetPass from "./pages/resetpass/ResetPass";
import Settings from "./pages/settings/Settings";
import ReputationPage from "./pages/reputationpage/ReputationPage";
import SinglePost from "./pages/singlePost/SinglePost";
import { useReducer } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLayoutEffect } from 'react'
import { postsReducer } from "./functions/reducer";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { GetProfileFollowers, GetProfileFollowing, GetuserLikedPosts } from "./functions/user";
import SpecificComment from "./pages/singlePost/SpecificComment";
import {PostProvider} from "./pages/singlePost/SinglePageContext"
import { ProfileProvider } from "./pages/profilepage/ProfileContext";
import { PostFullPageProvider } from "./pages/singlePost/FullSinglePageContext";


export default function App() {
  const navigate = useNavigate();
  const {user} = useSelector((state)=> ({ ...state}));
  const [{loading, error, posts},dispatch] = useReducer(postsReducer,{
    loading: false,
    posts: [],
    error: "",
  });


  //Just ki erro rnaa aye
  // console.log(loading,error)

  useEffect(()=>{
  getAllPosts();
  getLogedinUserLikedPosts();
  getLogedinUserFollower();
  getLogedinUserFollowing();
  backfuntions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  

//Gettinbg all Post
  const getAllPosts = async()=>{
    try {
     
      dispatch({
        type:"POST_REQUEST",
      });
      
         const {data} = await axios.get(`${process.env.REACT_APP_NACKEND_URL}/getAllPosts`,{
          headers:{
          Authorization: `Bearer ${user.token}`,
        }
         });
         dispatch({
           type:"POST_SUCCESS",
           payload: data,
         });
    } catch (error) {
      if(error.response.data === "Invalid Authentication")
      console.log("sahi hai bahai")
      
      dispatch({
        type:"POST_ERROR",
        payload: error.response.data.message,
      });
      logout()
    }
  }

  const logout =()=>{
    Cookies.set("user", "")
  dispatch({
    type:'LOGOUT',
  });
  navigate("/");
  }




  //Getting all likes post of logged in user
  const getLogedinUserLikedPosts = async()=>{
    const getUsersPostLiked = await GetuserLikedPosts(user.token);
    sessionStorage.setItem('getUsersPostLiked', JSON.stringify(getUsersPostLiked));
  }

    //Setting Back funtions false all likes post of logged in user
    const backfuntions = async()=>{;
      var backfunctionold = sessionStorage.getItem("backfuntion")
      if (backfunctionold !== "true") {
        sessionStorage.setItem('backfuntion', "false");
      }
    }
  
  



  //Getting followers and following of Logged in User
  const getLogedinUserFollower = async()=>{
    const getUsersFollowers = await GetProfileFollowers(user.token);
    sessionStorage.setItem('LogedinUsersFollowers', JSON.stringify(getUsersFollowers));
  }


  
  const getLogedinUserFollowing = async()=>{
    const getUsersFollowing = await GetProfileFollowing(user.token);
  sessionStorage.setItem('LogedinUsersFollowwing', JSON.stringify(getUsersFollowing));
  }



  const Wrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
  } 






  return (
    <PostFullPageProvider>
    <ProfileProvider>
    <PostProvider>
    <Wrapper>
<Routes>
  {/* When user is logged in , we dont allow to go to these routes */}
     <Route element={<NotLoggedInRoutes/>}>
           <Route exact path="/" element={<Landing />} />
           <Route exact path="/login" element={<Login />} />
           <Route exact path="/register" element={<SignUp />} />
           <Route exact path="/reset" element={<ResetPass/>} />           
     </Route>  

{/* When user is NOT logged in , we dont allow to go to these routes */}

    <Route element={<LoggedInRoutes/>} >
           <Route exact path="/profile"  element={<Profile />} />
           <Route exact path="/profile/:username"  element={<Profile />} />
           <Route exact path="/home" element={<Home  posts={posts} />} />
           <Route exact path="/pat" element={<SinglePost />} />
           <Route exact path="/pat/:specificpost" element={<SinglePost />} />
           <Route exact path="/comment/:specificcomment" element={<SpecificComment/>} />
           <Route exact path="/activate/:token" element={<Acttivate/>} />
           <Route exact path="/verify" element={<VerifyAccount/>} />
           <Route exact path="/setting" element={<Settings/>} />
           <Route exact path="/reputation" element={<ReputationPage/>} />
    </Route>
</Routes>
</Wrapper>
</PostProvider>
</ProfileProvider>
</PostFullPageProvider>
  );
}
