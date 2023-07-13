import React from "react";
import {NavLink,Outlet} from "react-router-dom"

export default function HostLayout(){
  return(
    <div className='layout-section'>
      <nav className='host-nav-bar-container'>
        <NavLink to='/host' end //"end" will stop the url matching and prevent the /host route to not be active when nesting routes
          className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
        >Dashboard</NavLink>

        <NavLink to='/host/income' 
          className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
        >Income</NavLink>

        <NavLink to='/host/host-vans'
          className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
        >Vans</NavLink>

        <NavLink to='/host/review' 
          className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
        >Reviews</NavLink>
      </nav>

       <Outlet/>
    </div>
  )
}