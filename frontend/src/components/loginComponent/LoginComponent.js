import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import Cookies from "js-cookie";
import LoginInputs from "./LoginInputs";
import KitPatLoader from "../forLoadingKitpatBlur/KitPatLoader";
const loginInfos = {
  email: "",
  password: "",
};
export default function LoginComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const [loading, setLoading] = useState(false)
  const { email, password } = login;
  // console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation= Yup.object({
    email:Yup.string().required("Email Address is required").email("Must be a valid email"),
    password:Yup.string().required("Password is required"),
  })
  const [error,setError] = useState("")
  
  
  const loginSubmit= async()=>{
  try {
 const {data} = await axios.post(`${process.env.REACT_APP_NACKEND_URL}/login`,
    {
      email,
      password,
    });
    dispatch({type:"LOGIN", payload:data});
    Cookies.set("user", JSON.stringify(data));
    navigate("/home")
    setLoading(false)
  } catch (error) {
    setError(error.response.data.message);
    setLoading(false)
  }
  };
  return (
    <>
    {
      loading && <KitPatLoader/>
    }
    <div id="LoginRightSection">
      <div id="DetailsRightLogin">
        <h1>Sign In</h1>
        <h2>Welcome Back Kat.</h2>
        <h3>#KeepBuilding</h3>

        <Formik
          enableReinitialize
          initialValues={{
            email,
            password,
          }}
          validationSchema ={loginValidation}
          onSubmit={()=>{
            loginSubmit();
            setLoading(true)
          }}
        >
          {(formik) => (
            <Form id="LoginForm" action="#">
              <LoginInputs
                type="text"
                name="email"
                placeholder="Email address"
                onChange={handleLoginChange}
              />
              <LoginInputs
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleLoginChange}
              />
              <h6 id="forgotPass">
                <Link to="/reset">Forgot your password?</Link>{" "}
              </h6>
              <button type="submit" id="signupbtn">
                Sign In
              </button>
              <p id="loginlol">
                Not a member yet? <Link to="/register">SignUp here</Link>.
              </p>
              {error && <div id='errorTextSignIn'>{error}</div>}
              
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </>
  );
}
