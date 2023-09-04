import React from "react";
import {NavLink,Link,Outlet, useLoaderData, defer, Await, useSearchParams} from "react-router-dom"
import { requireAuth } from "../../utils";
import { LoginContext } from "../..";

export function loader(){

}

export default function UserVans(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn(true) //fixes the component and bad state error
  },[])
  
  return(
    <>
      <h1>user browse vans here</h1>
    </>
  )

}