import React from "react";
import {Link, useSearchParams, useLoaderData, defer,Await} from "react-router-dom"
import { getVans } from "../../server/api";

//export Vans loader to allow me to load the data before components render
export function loader(){
  //fetch the vans data first and this is where useLoaderData() will get its data
  return defer({vans:getVans()}) //defer takes an object
}


export default function Vans(){
  //load the vans data and set it to a variable
  const dataPromise =  useLoaderData() //CONCEPT: add defer to allow the data to load another time
  
  //gets the query parameter from URL(/localhost/vans?type=Simple)
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type") //what the function will filter out based upone van type
  
  //this is to make the return less nested
  function renderVanElements(vans){
    //Filter Feature using useSearchParams()
    //filter the list if there is a query parameter of type={"Simple,Rugged,Luxury"}
    //Use a ternary operator to see if typeFilter exists? chooose van to filter after
    const filterVansList =typeFilter
      ? vans.filter(van=> van.type ===typeFilter) 
      : vans 

    const vansElement = filterVansList.map(van=>{
      return (
        <div key={van.id} className="van-tile">
          {/* Link State concept: pass a Link prop called state which contains an object with the current searchParams as a property */}
          <Link className="van-link" to={van.id} 
            state={{search: `?${searchParams.toString()}`, type: typeFilter}} //this is used to give to vanDetail page, useLocation will location this
          > 
            <img className="van-image" src={van.imageUrl}/>
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
      <h1>Explore our van options</h1>
      <React.Suspense fallback={<h1>Loading Vans...</h1>}>
        <Await resolve={dataPromise.vans}>
          {renderVanElements}
        </Await>
      </React.Suspense>

    </div>
    
  
  )
}
