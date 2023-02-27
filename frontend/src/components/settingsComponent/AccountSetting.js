import React from "react";
import { useSelector } from "react-redux";

export default function AccountSetting() {
  const {user} = useSelector((user)=>({...user}));
  return (
    <>

      <div id="AccountSettingsMenu">
      <div>Name <span>{user?.first_name}</span></div>
      <hr />
      <div>Username <span>{user?.username}</span></div>
      <hr />
      <div>Email <span>{user?.email}</span></div>
      <hr />
      <div>Email Verification <span>Done</span></div>
      <hr />
      <div>KITPAT Verified <span>Coming-Soon!</span></div>
      <hr />
      <div>Account creation <span>{user?.createdAt.substring(0, 10)}</span></div>
      
      <hr />
      </div>
    </>
  );
}
