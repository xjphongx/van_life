import React from "react";
import {NavLink,Link,Outlet, useLoaderData, defer, Await, useSearchParams} from "react-router-dom"
import { requireAuth } from "../../utils";
import { LoginContext } from "../..";
import { getVans } from "../../../server/api";


export function loader({request}){
  const user = requireAuth({request})
  return defer({vans:getVans()})
}

export default function UserVans(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn("User") //fixes the component and bad state error
  },[])

  const dataPromise = useLoaderData()

  function renderVanElements(){
    return(
      <>

      </>
    )
  }


  return(
    <div className='option-container'>
      <h1>Explore our van options</h1>
      <React.Suspense fallback={<h1>Loading Vans...</h1>}>
        <Await resolve={dataPromise.vans}>
          {renderVanElements}
        </Await>
      </React.Suspense>

    </div>
  )

}