import React from "react";

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

  
  //console.log(vans) // log out the vans with the Host ID of 123

  const vansElement = vans.map((van)=>{
    return(
      <div key={van.id} className="host-vans-container">
        <img className="host-van-image-icon" src={van.imageUrl}/>
      </div>
      
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