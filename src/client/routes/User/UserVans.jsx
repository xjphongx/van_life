import React from "react";
import {NavLink,Link,Outlet, useLoaderData, defer, Await, useSearchParams} from "react-router-dom"
import { requireAuth } from "../../utils";
import { LoginContext } from "../..";
import { getVans } from "../../../server/api";


export function loader({request}){
  const user = requireAuth(request)
  return defer({vans:getVans()})
}

export default function UserVans(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn("User") //fixes the component and bad state error
    localStorage.setItem("loginType", "user")
  },[])

  const dataPromise = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")

  function renderVanElements(vans){
    const filterVansList =typeFilter
      ? vans.filter(van=> van.type ===typeFilter) 
      : vans 

      const vansElement = filterVansList.map(van=>{
        //console.log(van)
        
        return (
          <div key={van._id} className="van-tile">
            {/* Link State concept: pass a Link prop called state which contains an object with the current searchParams as a property */}
            <Link className="van-link" onClick={()=>console.log(`clicking ${van._id}`)} to={van._id} 
              state={{search: `?${searchParams.toString()}`, type: typeFilter}} //this is used to give to vanDetail page, useLocation will location this
            > 
              <img className="van-image" src={van.imageUrl[0]}/>
              <div className="van-info">
                <h3>{van.name}</h3>
                <p>${van.price} <span>/day</span></p>
              </div>
              <p className={`van-type ${van.type}` } >{van.type}</p>
            </Link>
          </div>
        )
      })


    return(
      <>
        <div className='filter-van-container'>
          {/* setSearchParams: look for object with type Simple */}
          <button onClick={()=>setSearchParams({type: "Simple"})} 
            className={`filter-button Simple ${typeFilter==="Simple"?"selected":""}`}
            >Simple</button> 
          <button onClick={()=>setSearchParams({type: "Luxury"})} 
            className={`filter-button Luxury ${typeFilter==="Luxury"?"selected":""}`}
            >Luxury</button>
          <button onClick={()=>setSearchParams({type: "Rugged"})} 
            className={`filter-button Rugged ${typeFilter==="Rugged"?"selected":""}`}
            >Rugged</button>
          {typeFilter&&<button onClick={()=>setSearchParams({})} className='clear-filter-button'>Clear filters</button>}
        </div>
        <div className='van-list'>
          {vansElement}
        </div>
      </>
    )
  }


  return(
    <div className='option-container'>
      <h1>Browse our van options</h1>
      <React.Suspense fallback={<h1>Loading Vans...</h1>}>
        <Await resolve={dataPromise.vans}>
          {renderVanElements}
        </Await>
      </React.Suspense>

    </div>
  )

}