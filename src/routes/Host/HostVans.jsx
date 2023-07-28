import React from "react";
import {NavLink, useLoaderData, defer, Await} from "react-router-dom"
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../utils";

//first export a loader for the route prop loader={}
export async function loader({request}){
  await requireAuth(request) //ensures that the function runs completely before it gets a list of host vans
  return defer({hostVans:getHostVans()}) //This will get saved into the useLoaderData Hook
}

export default function HostVans(){
  //get the promise to the getHostVans()
  const dataPromise = useLoaderData() //grab loaded data for this route



  //helper function to render the vans element
  function renderHostVansElements(hostVans){
    //Each element will have these html attributes
    const vansElement = hostVans.map((van)=>{
      return(
        <>
          <NavLink key={van.id} className="host-van-link" to={van.id}>
            <div  className="host-vans-container">
              <img className="host-van-image-icon" src={van.imageUrl}/>
              <div className="host-van-info-container">
                <h2 className="host-van-name">{van.name}</h2>
                <p className="host-van-price">${van.price}<span>/day</span></p>
              </div>
            </div>
          </NavLink>
          
        </>
        
      )
    })
    //return the vans element in a fragment
    return(
      <>
        {vansElement}
      </>
    )


  }


  //return statement of the whole HostVans Componenet
  return(
    <>
      <h1>Your listed vans</h1>
      <div className="host-vans-list-container">
      <React.Suspense fallback={<h1>Loading Host vans...</h1>}>
        <Await resolve={dataPromise.hostVans}>
          {renderHostVansElements}
        </Await>
      </React.Suspense>  
        
        
      </div>
    </>
  )
}