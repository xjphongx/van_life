import React from "react";
import {NavLink,Link,Outlet, useLoaderData, defer, Await, useSearchParams} from "react-router-dom"
import { getListHostVans } from "../../../server/api";
import { requireAuth } from "../../utils";
import { LoginContext } from "../..";

//first export a loader for the route prop loader={}
export async function loader({request}){
  const user = await requireAuth(request) //ensures that the function runs completely before it gets a list of host vans
  return defer({hostVans:getListHostVans(user._id)}) //This will get saved into the useLoaderData Hook
}

export default function HostVans(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn(true) //fixes the component and bad state error
    localStorage.setItem("loginType", "user")
  },[])
  //get the promise to the getHostVans()
  const dataPromise = useLoaderData() //grab loaded data for this route
  const [searchParams, setSearchParams] = useSearchParams()

  //helper function to render the vans element
  function renderHostVansElements(hostVans){
    //Each element will have these html attributes
    //console.log(hostVans)
    const vansElement = hostVans.map((van)=>{
      //console.log(van)
      return(
          <NavLink key={van._id} className="host-van-link" to={van._id} state={{search: `?${searchParams.toString()}` }}>
            <div  className="host-vans-container">
              <img className="host-van-image-icon" src={van.imageUrl[0]}/>
              <div className="host-van-info-container">
                <h2 className="host-van-name">{van.name}</h2>
                <p className="host-van-price">${van.price}<span>/day</span></p>
              </div>
            </div>
          </NavLink>
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
      <div className="host-van-button-container">
        <h1>Your listed vans</h1>
        <NavLink to="upload" className="host-van-add-button">Add Van</NavLink>
      </div>
      <React.Suspense fallback={<h1>Loading Host vans...</h1>}>
        <Await resolve={dataPromise.hostVans}>
          {renderHostVansElements}
        </Await>
      </React.Suspense>  
    </>
  )
}