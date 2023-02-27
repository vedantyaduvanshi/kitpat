import React, { useRef } from 'react'
import useClickOutside from "../../helpers/ClickOutside"


export default function Notifications({setShowNotifications}) {
    const notify = useRef(null);
    useClickOutside(notify,()=>{
        setShowNotifications(false);
    })
  return (
    <div id='NotificationsCard' ref={notify}>
      <div id='NotifyYou'>
        <p>Notifications</p> <span>Clear</span>
      </div>
      <hr />
    </div>
  )
}
