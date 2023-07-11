import React from "react";
import { Link } from 'react-router-dom';

export default function Navbar(){
  return(
    <nav className="nav-bar-container">
      <Link to="/" className="vanlife-header">#VANLIFE</Link>
      <div className="route-container">
        <Link to='/host' className="nav-link-route">Host</Link>
        <Link to="/about" className="nav-link-route">About</Link>
        <Link to="/vans" className="nav-link-route">Vans</Link>
      </div>
    </nav>
  )
}