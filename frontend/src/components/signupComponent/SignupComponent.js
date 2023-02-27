import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import {Formik,Form} from "formik";
import SignUpInput from './SignUpInput';
import { useState } from 'react';
import * as Yup from "yup"
import axios from "axios";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";
import KitPatLoader from '../forLoadingKitpatBlur/KitPatLoader';


export default function SignupComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const userInfos={
  first_name:"",
  username:"",
  email:"",
  password:""
}
  const [user, setUser] = useState(userInfos);
  const {first_name,username,email,password} = user
  const handleRegisterChange = (e)=>{
    const {name,value}=e.target
    setUser({...user,[name]:value})
  }
 const registerValidation = Yup.object({
  first_name:Yup.string().required("🙄Wait! You don't have a name ?")
  .min(4,"🙄Too short , Name must be at least 4 characters")
  .max(22,"😲 Name must be at most 22 characters")
  .matches(/^[aA-zZ]+$/, "😬Spaces, Numbers and Special characters not allowed!"),
  username:Yup.string().required("⛔You must create your username.")
  .min(4,"🙄Too short , usename must be at least 4 characters")
  .max(13,"😲 Too long, username must be at most 13 characters")
  .matches( /^[a-zA-Z0-9]+$/, "😬 Spaces and Special characters not allowed!"),
  email: Yup.string()
  .required("🙄Email is required.")
  .email("😐Enter a valid email address."),
  password:Yup.string()
  .required("💪Take your time, set a strong password.")
  .min(9,"☹️Weak , password must be at least 9 characters")
  .max(45, "Password must be at most 45 characters")
 })

 const [error,setError] = useState("")
 const [success,setSuccess] = useState("")
 
 


 
 
 const registerSubmit = async()=>{
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_NACKEND_URL}/register`,
    {
      first_name,
      username,
      email,
      password
    });
    setError("");
    setSuccess(data.message);
    const {message, ...rest} = data;
    dispatch({type:"LOGIN", payload:rest});
    Cookies.set("user", JSON.stringify(rest));
    setLoading(false)
    navigate("/home")
  } catch (error) {   
    setSuccess("");
    setError(error.response.data.message)
    setLoading(false)
  }
 }
  return (
    <>
    {
       loading && <KitPatLoader/>
    }
    <div id="SignUpRightSection">
    <div id="SignUpRightPosts">

   
    <h1>Sign Up</h1>
    
    <Formik
    enableReinitialize
    initialValues={{
      first_name,
      username,
      email,
      password,
    }}
    validationSchema={registerValidation}
    onSubmit={()=>{
      registerSubmit();
      setLoading(true);
    }}
    >

          {
            (formik)=>(
              <Form id="signUpForm" action="#" >
        
         <SignUpInput onChange={handleRegisterChange} type="text" placeholder="First Name" name="first_name"/>

          <SignUpInput onChange={handleRegisterChange} type="text" placeholder="Create a username" name="username"/>
           
           
          <SignUpInput onChange={handleRegisterChange} type="text" placeholder="Email" name="email"/>

          <SignUpInput  onChange={handleRegisterChange} type="password" placeholder="Set a Strong Password" name="password"/>

         <p>By creating an account you agree to our <Link  to="/">Terms & Privacy</Link>.</p>
         <button type="submit" id="signupbtn">Sign Up</button>
         <h6 id="lol" >Already a member ?<Link to="/login"> SignIn here</Link>.</h6>

         
         {error && <div id='errorText'>{error}</div>}
         {success && <div id='SuccesText'>{success}</div>}
        
              </Form>
            )
          }


    </Formik>

</div>
</div>
</>
  )
}
