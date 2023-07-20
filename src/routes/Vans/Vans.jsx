import React from "react";
import {Link, useSearchParams} from "react-router-dom"

export default function Vans(){
  const [vans, setVans] = React.useState([])
  
  //gets the query parameter from URL(/localhost/vans?type=Simple)
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type") //what the function will filter out based upone van type



  //fetch data when the van page loads
  React.useEffect(()=>{
    //helper function to get van data from mirage JS API
    async function getVans() {
      const response = await fetch("/api/vans")
      const data = await response.json()
      setVans(data.vans)
    }
    getVans() //call helper function
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
      <>
        <div key={van.id} className="van-tile">
        <Link className="van-link" to={`/vans/${van.id}`}>
          <img className="van-image" src={van.imageUrl}/>
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>${van.price} <span>/day</span></p>
          </div>
          <p className={`van-type ${van.type}` } >{van.type}</p>
        </Link>
          
        </div>
        
      </>
      
    )
  })
  
  
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
          {console.log(typeFilter)}
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