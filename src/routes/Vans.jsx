import React from "react";
import {Link} from "react-router-dom"

export default function Vans(){
  const [vans, setVans] = React.useState([])
  
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
  
 

  const vansElement = vans.map(van=>{
    //captialize the first character of the type
    //ex: given "simple" div will output Simple
    const captialWord = van.type.charAt(0).toUpperCase() + van.type.slice(1)

    return (
      <div onClick={()=>console.log("clicked")} key={van.id} className="van-tile">
        <Link to={`/vans/${van.id}`}>
          <img className="van-image" src={van.imageUrl}/>
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>${van.price} <span>/day</span></p>
          </div>
          <p className={`type-tag-${van.type}`} >{captialWord}</p>
        </Link>
          
      </div>
    )
  })
  
  
  return(
    <div>
      <div className='option-container'>
        <h1>Explore our van options</h1>
        <div className='filter-van-container'>
          <button className='filter-button'>Simple</button>
          <button className='filter-button'>Luxury</button>
          <button className='filter-button'>Rugged</button>
          <button className='clear-filter-button'>Clear filters</button>
        </div>
        
      </div>
      <div className='van-list'>
        {vansElement}
        
      </div>
    </div>
  )
}