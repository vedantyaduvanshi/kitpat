import React from 'react'
import BarLoader from "react-spinners/BarLoader";

export default function ActivateForm({type,header,text,loading,redirecting}) {
  return (
    <>
    <div id='ActivateAccBlur' ></div>
        <div id='ActivateAccountAll'>
        <div id='ActivationPopup'>
         {header}
        </div>
        <div id='verificationText'>
        {text}
        </div>
        <BarLoader color='#00EEFF' loading={loading} size={100} />
        <span id='redirecting'>
        {redirecting}
        </span>
    </div>
    </>
  )
}
