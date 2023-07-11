import React from "react";
import {Link,Outlet} from "react-router-dom"

export default function HostLayout(){
  return(
    <div className='main-section'>
      <nav className='nav-bar-container'>
        <Outlet/>
        
      </nav>
    </div>
  )
}