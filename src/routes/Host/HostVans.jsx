import React from "react";
import {NavLink, useLoaderData} from "react-router-dom"
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../utils";

//first export a loader for the route prop loader={}
export async function loader(){
  await requireAuth() //ensures that the function runs completely before it gets a list of host vans
  return getHostVans() //This will get saved into the useLoaderData Hook
}

export default function HostVans(){
  const vans = useLoaderData() //grab loaded data for this route
  //console.log(vans) // log out the vans with the Host ID of 123

  const vansElement = vans.map((van)=>{
    return(
      <NavLink key={van.id} className="host-van-link" to={van.id}>
        <div  className="host-vans-container">
          <img className="host-van-image-icon" src={van.imageUrl}/>
          <div className="host-van-info-container">
            <h2 className="host-van-name">{van.name}</h2>
            <p className="host-van-price">${van.price}<span>/day</span></p>
          </div>
        </div>
      </NavLink>
    )
  })

  return(
    <>
      <h1>Your listed vans</h1>
      <div className="host-vans-list-container">
        {vansElement}
      </div>
    </>
  )
}