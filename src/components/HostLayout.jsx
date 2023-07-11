import React from "react";
import {Link,Outlet} from "react-router-dom"

export default function HostLayout(){
  return(
    <div className='layout-section'>
      <nav className='host-nav-bar-container'>
        <Link to='/host' className="host-link-route">Dashboard</Link>
        <Link to='/host/income' className="host-link-route">Income</Link>
        <Link className="host-link-route">Vans</Link>
        <Link to='/host/review' className="host-link-route">Reviews</Link>
      </nav>

       <Outlet/>
    </div>
  )
}