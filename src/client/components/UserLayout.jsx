import React from "react";
import {NavLink,Outlet} from "react-router-dom"
import { UserContext } from "../context/userContext";

export default function UserLayout(){
  return(
    <div className='layout-section'>
      <nav className='user-nav-bar-container'>
        <NavLink to='.' end //"end" will stop the url matching and prevent the /host route to not be active when going through the nesting routes
          className={({isActive})=>isActive? "active-user-link-route" :"pending-user-link-route"}
        >Dashboard</NavLink>

        <NavLink to='vans'
          className={({isActive})=>isActive? "active-user-link-route" :"pending-user-link-route"}
        >Browse Vans</NavLink>

        <NavLink to='request'
          className={({isActive})=>isActive? "active-user-link-route" :"pending-user-link-route"}
        >Request</NavLink>
      </nav>
       <Outlet />
    </div>
    
  )
}