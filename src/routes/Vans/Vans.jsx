import React from "react";
import {Link, useSearchParams} from "react-router-dom"
import { getVans } from "../../../api";

export default function Vans(){
  const [vans, setVans] = React.useState([])
  const [loading, setLoading] =React.useState(false)
  
  //gets the query parameter from URL(/localhost/vans?type=Simple)
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type") //what the function will filter out based upone van type

  //fetch data when the van page loads
  React.useEffect(()=>{
    async function loadVans(){
      setLoading(true)
      const data =  await getVans() //getVans from api.js files
      setVans(data)
      setLoading(false)
    }
    loadVans()
  },[])
  
 
  //Filter Feature using useSearchParams()
  //filter the list if there is a query parameter of type={"Simple,Rugged,Luxury"}
  //Use a ternary operator to see if typeFilter exists? chooose van to filter after
  const filterVansList =typeFilter
    ? vans.filter(van=> van.type ===typeFilter) 
    : vans 

  const vansElement = filterVansList.map(van=>{
    //captialize the first character of the type
    //ex: given "simple" div will output Simple
    /* const captialWord = van.type.charAt(0).toUpperCase() + van.type.slice(1) */

    return (
      <div key={van.id} className="van-tile">
        {/* Link State concept: pass a Link prop called state which contains an object with the current searchParams as a property */}
        <Link className="van-link" to={van.id} 
          state={{search: `?${searchParams.toString()}`, type: typeFilter}}
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
  

  if(loading){
    return<h1>loading...</h1>
  }
  
  return(
    <div className='main-section'>
      <div className='option-container'>
        <h1>Explore our van options</h1>
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
        
      </div>
      <div className='van-list'>
        {vansElement}
        
      </div>
    </div>
  )
}


/* <Link to="?type=Simple" className='filter-button'>Simple</Link>
          <Link to="?type=Luxury" className='filter-button'>Luxury</Link>
          <Link to="?type=Rugged" className='filter-button'>Rugged</Link>
          <Link to="." className='clear-filter-button'>Clear filters</Link> */