import React from "react";

export default function Vans(){
  const [vans, setVans] = React.useState([])
  
  //fetch data when the van page loads
  React.useEffect(()=>{
    //helper function to get van data from mirage JS API
    async function getVans() {
      const response = await fetch("/api/vans")
      const vanData = await response.json()
      setVans(vanData)
    }
    getVans() //call helper function
  },[])
  
  console.log(vans)
  
  return(
    <main>
      <div className='option-container'>
        <h1>Explore our van options</h1>
        <div className='filter-van-container'>
          <button className='filter-button'>Simple</button>
          <button className='filter-button'>Luxury</button>
          <button className='filter-button'>Rugged</button>
          <button className='clear-filter-button'>Clear filters</button>
        </div>
      </div>
    </main>
  )
}