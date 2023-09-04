import React from "react";
import { Link, NavLink,useNavigate } from 'react-router-dom';
import {BiUserCircle} from 'react-icons/Bi';
import { LoginContext } from "..";
import { logOut } from "../../server/api";

export default function Navbar(){
  const [loggedIn,setLoggedIn] = React.useContext(LoginContext)
  const navigate = useNavigate()

  function handleLogOut() {
    console.log("clearing localStorage loggedin")
    setLoggedIn(false)
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("loginType")
    const response = logOut()
    navigate("/login")
    
}
  
  return(
    <nav className="nav-bar-container">
      <Link to="/" className="vanlife-header">#VANLIFE</Link>
      <div className="route-container">
      {/* NavLink has a active and pending state, which is passed through the className prop,  */}
        {/* <NavLink to='host' //to='.' "take me to the current path"
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
        >Account</NavLink> */}

        <NavLink to="about" 
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
        >About</NavLink>

        <NavLink to="vans" 
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
        >Vans</NavLink>

        <NavLink to={loggedIn? `${loggedIn}` :"login"}
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
        ><BiUserCircle size={25}/>
        </NavLink>

        
        {loggedIn&&<button className="log-out-button" onClick={handleLogOut}>Log Out</button>}

      </div>
    </nav>
  )
}