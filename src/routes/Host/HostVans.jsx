import React from "react";
import {Link} from "react-router-dom"

export default function HostVans(){
  const [vans, setVans] = React.useState([])

  //Make fetch request to MirageJS server
  React.useEffect(()=>{
    fetch("/api/host/vans") //get the endpoints 
      .then((response)=>response.json())
      .then((data)=>{
        setVans(data.vans)
      })
  },[])

  
  console.log(vans) // log out the vans with the Host ID of 123

  const vansElement = vans.map((van)=>{
    return(
      <Link key={van.id} className="host-van-link" to={`/host/host-vans/${van.id}`}>
        <div  className="host-vans-container">
          <img className="host-van-image-icon" src={van.imageUrl}/>
          <div className="host-van-info-container">
            <h2 className="host-van-name">{van.name}</h2>
            <p className="host-van-price">${van.price}<span>/day</span></p>
          </div>
        </div>
      </Link>
    )
  })


  return(
    <>
      <h1>Your listed vans</h1>
      <div className="host-vans-list-container">
        {vansElement}
      </div>
    </>
  )
}