import React from "react";
import {Link, NavLink, Outlet, useParams } from "react-router-dom";

export default function HostVansDetail(){
  const params = useParams()
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
        <main>
          {/* This it he back to all vans button until line 40  */}
          <div className='host-detail-back-container'>
            <p className='arrow'> &larr; </p>
            <Link to='..' 
              relative="path" //tell react to go back in one level in PATH and NOT in ROUTE hierarchy
              className='detail-back-button'>Back to all vans
            </Link>
          </div> 
          <section className="host-van-detail-container">
            {/* This is the container for the van images and labels  */}
            <div className="host-van-detail-label-container">
              <img className="host-van-detail-image-icon" src={currentVan.imageUrl}/>
              <div className="vertical-container">
                <div className={`host-type-tag-${currentVan.type}`}>{captialType}</div>
                <h1>{currentVan.name}</h1>
                <p className= 'detail-info-price'>${currentVan.price} <span>/day</span></p>
              </div>
            </div>
            {/* Everything below to other comment line... Is a van detail layout */}
            <nav className="host-subnavbar-container">
                <NavLink
                  to='.' end
                  className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
                >Details</NavLink>
                <NavLink
                  to='pricing'
                  className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
                >Pricing</NavLink>
                <NavLink
                  to='photos'
                  className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
                >Photos</NavLink>

              </nav>
              {/* To this comment line above */}
              <Outlet context={currentVan}/> {/* passing context like a prop but uses a method to get context */}
          </section>
        </main>
        
        
      : <div className='loading-container'>
          <h1>Loading...</h1>
        </div>
      }
    </>
  )
}


