import React from 'react'
import Helmet from 'react-helmet';
import "./resetpass.css"
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useState } from 'react';
import LoginInputs from '../../components/loginComponent/LoginInputs';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import KitPatLoader from '../../components/forLoadingKitpatBlur/KitPatLoader';

export default function ResetPass() {
  const navigate = useNavigate();
  const [loading, setLoading]=useState(false);
  const [emailpage, setEmailpage]=useState(true);
  const [codepage, setCodepage]=useState(false);
  const [changepass, setChangepass]=useState(false);
  const [email,setEmail]= useState("");
  const [code,setCode]= useState("");
  const [password,setPassword]= useState("");
  const [confirmpassword,setConfirmpassword]= useState("");
  const [error,setError]= useState("");
  const [successChangingPass,setsuccessChangingPass]= useState("");


  //Function to send Reset code 
       
   const sendEmail= async () =>{
    try {
      await axios.post(`${process.env.REACT_APP_NACKEND_URL}/recoverAcc`,
      {email}
      );
      setError("");
      setCodepage(true)
      setEmailpage(false)
      setChangepass(false)
      setLoading(false)
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
   }
    


  // send Reset code Ends here



  //Code verification starts here
 const verifyCode = async()=>{
  try {
    await axios.post(`${process.env.REACT_APP_NACKEND_URL}/validateResetCode`,
    {email,code});
    setError("")
    setCodepage(false)
    setEmailpage(false)
    setChangepass(true)
    setLoading(false)
  } catch (error) {
    setError(error.response.data.message)
    setLoading(false)
  }
 }

  //Code verificaition ends here






  //Changing password starts here


  const ChangePassword = async()=>{
     try {
      await axios.post(`${process.env.REACT_APP_NACKEND_URL}/changePass`,{
        email,
        password,
      });
      setError("")
      setLoading(false);
      setsuccessChangingPass("Password changed successfully")
      setTimeout(() => {
      navigate("/");
      }, 2000);
      
     } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
     }
  }


  //CHANNGING PASSWORD ENDS HERE



  const validateEmail = Yup.object({
    email: Yup.string()
    .required("Email Address is required.")
    .email("Must be valid remail address.")
    .max(50)
    .min(8),
  });
  const validateCode = Yup.object({
    code: Yup.string().required("Code is required")
    .min(5)
    .max(5),
  })

  const validationPassword = Yup.object({
    password:Yup.string()
    .required("💪Take your time, set a strong password.")
    .min(9,"☹️Weak , password must be at least 9 characters")
    .max(45, "Password must be at most 45 characters"),
    confirmpassword:Yup.string()
      .required('Confirm your new Password')
      .oneOf([Yup.ref('password')], "Passwords must match.")
  })
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
                  overflow-y: hidden;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  }
                  *::-webkit-scrollbar {
                    width: 0px;
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
 
         <Link id='BackBtnForgot' to="/">Back</Link>
        
{emailpage  &&   <div id='ResetPassDiv'>
    <h2>KITPAT</h2>
    <p>Enter the email address linked with your KitPat account and we'll send you reset password code.</p>
    <Formik 
    enableReinitialize
    initialValues={{
     email,
    }}
    validationSchema={validateEmail}
    onSubmit={()=>{
      setLoading(true);
      sendEmail();
    }}
    >
{(formik)=>(
            <Form id='ForgotPassInput'>
            <LoginInputs
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            />
            {
              error && <div id="errorTextSignIn">{error}</div>
            }
            <button  type='submit'>Continue</button>
          </Form>
)}
  </Formik>
 </div>
}



{codepage  &&   <div id='ResetPassDiv'>
   <h2>KITPAT</h2>
   <p>Please enter the reset password code sent to your mail.</p>
   <Formik 
   enableReinitialize
   initialValues={{
     code,
   }}
   validationSchema={validateCode}
   onSubmit={()=>{
    setLoading(true);
    verifyCode();
  }}
   >
{(formik)=>(
            <Form id='ForgotPassInput'>
            <LoginInputs
             type="text"
            name="code"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code" />
            {
               error && <div id="errorTextSignIn">{error}</div>
            }
              <button type='submit'>Submit</button>
            </Form>
  )}
</Formik>
</div>
}





{changepass  &&   <div id='ResetPassDiv' style={{height: "310px"}}>
   <h2>KITPAT</h2>
   <h4>Set a Strong Password.</h4>
   <Formik 
   enableReinitialize
    initialValues={{
      password,
      confirmpassword,
    }}
    validationSchema = {validationPassword}
    onSubmit={()=>{
      setLoading(true);
      ChangePassword();
    }}
    >
{(formik)=>(
             <Form id='ForgotPassInput'>
             <LoginInputs
              type="password"
             name="password"
             onChange={(e) => setPassword(e.target.value)}
             placeholder="New Password" />
             <LoginInputs
              type="password"
             name="confirmpassword"
             onChange={(e) => setConfirmpassword(e.target.value)}
             placeholder="Confirm New Password" />
             {
               error && <div id="errorMessageLoginMail">{error}</div>
             }

            {
               successChangingPass && <div id="SuccesText">{successChangingPass}</div>
             }
             <button type='submit'>Submit</button>
          </Form>
)}
</Formik>
</div>
}

{
  loading &&  <KitPatLoader/>
}
         
  
         </>
  )
}
