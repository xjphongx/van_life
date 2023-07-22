import React from "react";
import { Link, NavLink } from 'react-router-dom';
import {BiUserCircle} from 'react-icons/Bi';

export default function Navbar(){
  return(
    <nav className="nav-bar-container">
      <Link to="/" className="vanlife-header">#VANLIFE</Link>
      <div className="route-container">
      {/* NavLink has a active and pending state, which is passed through the className prop,  */}
        <NavLink to='host' //to='.' "take me to the current path"
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
        >Host</NavLink>

        <NavLink to="about" 
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
        >About</NavLink>

        <NavLink to="vans" 
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
        >Vans</NavLink>

        <NavLink to="login"
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
        ><BiUserCircle size={25}/>
        </NavLink>

        

      </div>
    </nav>
  )
}