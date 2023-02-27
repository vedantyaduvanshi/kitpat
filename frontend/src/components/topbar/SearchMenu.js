import React, { useRef } from 'react'
import useClickOutside from "../../helpers/ClickOutside"


export default function SearchMenu({setShowSearchMenu}) {
    const menu = useRef(null);
    useClickOutside(menu,()=>{
        setShowSearchMenu(false);
    })
  return (
    <div id='searchcard' ref={menu} >
        
    </div>
  )
}
