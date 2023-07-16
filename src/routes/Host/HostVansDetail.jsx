import React from "react";
import {Link, NavLink, Outlet, useParams } from "react-router-dom";

export default function HostVansDetail(){
  const params = useParams()
  console.log(params)
  const [currentVan,setCurrentVan] = React.useState(null)
  const [captialType, setCaptialType] = React.useState("hi")

  //fetch data when page is loading 
  React.useEffect(()=>{
    //Helper function to captitalize the type property
    function makeCaptial(word){
      console.log(word)
      return word.charAt(0).toUpperCase() + word.slice(1)
    }
    //fetch data from endpoint that have the host id of "123"
    fetch(`/api/host/vans/${params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCurrentVan(data.vans)
        setCaptialType(makeCaptial(data.vans.type))
      })
  },[params.id])
  


  return(
    <>
      {currentVan? 
        <div>
          <div className='detail-back-container'>
            <p className='arrow'> &larr; </p>
            <Link to='/host/vans' className='detail-back-button'>Back to all vans</Link>
          </div> 
          <div className="host-van-detail-container">
            {/* This is the container for the van images and labels  */}
            <div className="host-van-detail-label-container">
              <img className="host-van-detail-image-icon" src={currentVan.imageUrl}/>
              <div className="vertial-container">
                <div className={`host-type-tag-${currentVan.type}`}>{captialType}</div>
                <h1>{currentVan.name}</h1>
                <p className= 'detail-info-price'>${currentVan.price} <span>/day</span></p>
              </div>
            </div>
            {/* Everything below to other comment line... Is a van detail layout */}
            <nav className="host-subnavbar-container">
                <NavLink
                  className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
                >Details</NavLink>
                <NavLink
                  className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
                >Pricing</NavLink>
                <NavLink
                  className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
                >Photos</NavLink>

              </nav>
              {/* To this comment line above */}
              <Outlet/>
          </div>
        </div>
        
        
      : <div className='loading-container'>
          <h1>Loading...</h1>
        </div>
      }
    </>
  )
}