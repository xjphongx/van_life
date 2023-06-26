import React from "react";
import { Link } from 'react-router-dom';

export default function Navbar(){
  return(
    <nav className="nav-bar-container">
      <Link to="/" className="vanlife-header">#VANLIFE</Link>
      <div className="route-container">
        <Link to="/about" className="nav-link-route">About</Link>
        <Link className="nav-link-route">Vans</Link>
      </div>
    </nav>
  )
}