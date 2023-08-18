import React from "react";
import { UserContext } from "../../context/userContext";
import {NavLink, useLoaderData, defer, Await} from "react-router-dom"
import { getHostVans } from "../../../server/api";
import { requireAuth } from "../../utils";

//first export a loader for the route prop loader={}
export async function loader({request}){
 
  const data = await requireAuth(request) //ensures that the function runs completely before it gets a list of host vans
  console.log(data) 
  return defer({hostVans:getHostVans()}) //This will get saved into the useLoaderData Hook
}

export default function HostVans(){
  //get the promise to the getHostVans()
  const dataPromise = useLoaderData() //grab loaded data for this route

 /*   const {user} = React.useContext(UserContext)
  console.log(user) */

  //helper function to render the vans element
  function renderHostVansElements(hostVans){
    //Each element will have these html attributes
    const vansElement = hostVans.map((van)=>{
      console.log(van)
      return(
        <>
          <NavLink key={van._id} className="host-van-link" to={van._id}>
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
        <div className="host-vans-list-container">
          {vansElement}
        </div>
    )


  }


  //return statement of the whole HostVans Componenet
  return(
    <>
      <h1>Your listed vans</h1>
      <React.Suspense fallback={<h1>Loading Host vans...</h1>}>
        <Await resolve={dataPromise.hostVans}>
          {renderHostVansElements}
        </Await>
      </React.Suspense>  
    </>
  )
}