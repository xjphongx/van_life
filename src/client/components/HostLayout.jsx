import React from "react";
import {NavLink,Outlet} from "react-router-dom"
import { UserContext } from "../context/userContext";

export default function HostLayout(){
  //const {user} = React.useContext(UserContext) //This is recieved from HostContext
  return(
    <div className='layout-section'>
      <nav className='host-nav-bar-container'>
        <NavLink to='.' end //"end" will stop the url matching and prevent the /host route to not be active when going through the nesting routes
          className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
        >Dashboard</NavLink>

        <NavLink to='income' 
          className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
        >Income</NavLink>

        <NavLink to='vans'
          className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
        >Vans</NavLink>

        <NavLink to='request' 
          className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
        >Requests</NavLink>

        <NavLink to='review' 
          className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
        >Reviews</NavLink>
      </nav>
       <Outlet />
    </div>
    
  )
}