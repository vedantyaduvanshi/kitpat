import React from "react";
import { useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import { Formik, Form } from "formik";
import LoginInputs from '../../components/loginComponent/LoginInputs';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import Cookies from 'js-cookie';
import KitPatLoader from "../forLoadingKitpatBlur/KitPatLoader";

export default function SecuritySetting() {
  const navigate = useNavigate();
  const {user} = useSelector((user)=>({...user}));
  const [current, setCurrent]=useState(true);


  // Currentpage where asks to continue
  const [changepass, setChangepass]=useState("");



  ///Validation, seding codes, verifying codes and changing password!!!! 
  const [error,setError]= useState("");
  const [loading, setLoading]=useState(false);

  //Code page where user enter code
  const [codepage, setCodepage]=useState(false);

  //New pass where user enter new Password
  const [newpass, setNewpass]=useState(false);

  const [code,setCode]= useState("");
  const [successChangingPass,setsuccessChangingPass]= useState("");


  //Password Validation
  const [password,setPassword]= useState("");
  const [confirmpassword,setConfirmpassword]= useState("");


  //Given email = user.email
  const email = ((user.email))
  

  function showChangePass(){
    setChangepass(true);
    setCurrent(false);
  }
  function showAccountMenu(){
    setCurrent(true); 
    setChangepass(false);
  }



  // When user clicks Continue and code sent to email
     const ContinueClicked= async () =>{
    try {
      await axios.post(`${process.env.REACT_APP_NACKEND_URL}/recoverAcc`,
      {email}
      );
      setLoading(true)
      setError("");
      setCodepage(true)
      setChangepass(false)
      setNewpass(false)
      setLoading(false)

    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
   }




 
   ///Validating code entered by user if it has 5 characters
   const validateCode = Yup.object({
    code: Yup.string().required("Code is required")
    .min(5)
    .max(5),
  })



    //Code verification starts here
 const verifyCode = async()=>{
  try {
    await axios.post(`${process.env.REACT_APP_NACKEND_URL}/validateResetCode`,
    {email,code});
    setError("");
    setCodepage(false)
    setChangepass(false)
    setNewpass(true)
    setLoading(false)
  } catch (error) {
    setError(error.response.data.message)
    setLoading(false)
  }
 }

  //Code verificaition ends here






  ///Validating users password if he entered min 9 characted and same password both
  const validationPassword = Yup.object({
    password:Yup.string()
    .required("💪Take your time, set a strong password.")
    .min(9,"☹️Weak , password must be at least 9 characters")
    .max(45, "Password must be at most 45 characters"),
    confirmpassword:Yup.string()
      .required('Confirm your new Password')
      .oneOf([Yup.ref('password')], "Passwords must match.")
  })



  //Changing password starts here


  const ChangePassword = async()=>{
    try {
     await axios.post(`${process.env.REACT_APP_NACKEND_URL}/changePass`,{
       email,
       password,
     });
     setError("")
     
     setsuccessChangingPass("Password changed successfully")
     setTimeout(() => {
      logout();
     }, 2000);
     setLoading(false);
    } catch (error) {
     setError(error.response.data.message)
     setLoading(false)
    }
 }


 //CHANNGING PASSWORD ENDS HERE




//  Logoutttt the user after password changed success
const dispatch = useDispatch();
const logout =()=>{
  Cookies.set("user", "")
dispatch({
  type:'LOGOUT',
});
navigate("/");
}

    

  return (
    <>


        
        {/*////Starting page starts here*/}
      {current && 
      <div id="AccountSettingsMenu">
      <div onClick={showChangePass} >Change Password</div>
      <hr />
      <div>Two-factor authentication <span>Coming-Soon</span></div>
      <hr />
      </div>
      }

       {changepass && 
      <div id="changePasswordSection">
      <div onClick={showAccountMenu}id="backbtnBackgroud"><span id="backtomenuAccountSetting" to="/home"></span></div>
        <h3>Change your account Password.</h3>
        <span id="paraSecurityChangepass">An email will be sent to <span style={{color: "rgb(0, 238, 255)"}}>{user?.email}</span> with the reset password code.</span>
        <span id="warningChangepass">*You need to re-login into your account after you change your password.</span>
        <button onClick={ContinueClicked}>Continue</button>
        {
               error && <div id="errorTextSignIn">{error}</div>
        }
      </div>
      }


      
      {/*///Satrting page ends here*/}






{/*//Code page Starts here*/}

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




{/*//Code page ends here*/}








{/*///User enter new pass Page starts here*/}

{newpass  &&   <div id='ResetPassDiv' style={{height: "310px"}}>
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

{/*//User enter new pass Page ends herew with Logout */}
{
  loading &&  <KitPatLoader/>
}
    </>
  );
}
