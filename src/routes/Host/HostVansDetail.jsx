import React from "react";
import {Link, NavLink, Outlet, useParams,useLoaderData } from "react-router-dom";
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../utils";

//get host van data with loader
export async function loader({params}){
  {/* <div className='loading-container'>
    <h1>Loading...</h1>
  </div> */}
  await requireAuth()
  return getHostVans(params.id)
}

export default function HostVansDetail(){
  const params = useParams()
  const currentVan = useLoaderData()

  return(
    <>
      <main>
        {/* This it he back to all vans button until line 40  */}
        <div className='host-detail-back-container'>
          <p className='arrow'> &larr; </p>
          <Link to='/host/vans' 
            relative="path" //tell react to go back in one level in PATH and NOT in ROUTE hierarchy
            className='detail-back-button'>Back to all vans
          </Link>
        </div> 
        <section className="host-van-detail-container">
          {/* This is the container for the van images and labels  */}
          <div className="host-van-detail-label-container">
            <img className="host-van-detail-image-icon" src={currentVan.imageUrl}/>
            <div className="vertical-container">
              <div className={`host-type-tag-${currentVan.type}`}>{currentVan.type}</div>
              <h1>{currentVan.name}</h1>
              <p className= 'detail-info-price'>${currentVan.price} <span>/day</span></p>
            </div>
          </div>
          {/* Everything below to other comment line... Is a van detail layout */}
          <nav className="host-subnavbar-container">
              <NavLink
                to='.' end
                className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
              >Details</NavLink>
              <NavLink
                to='pricing'
                className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
              >Pricing</NavLink>
              <NavLink
                to='photos'
                className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
              >Photos</NavLink>

            </nav>
            {/* To this comment line above */}
            <Outlet context={currentVan}/> {/* passing context like a prop but uses a method to get context */}
        </section>
      </main>
    </>
  )
}


