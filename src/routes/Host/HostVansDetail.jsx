import React from "react";
import { Link, useParams } from "react-router-dom";

export default function HostVansDetail(){
  const params = useParams()
  console.log(params)
  const [vanData,setVanData] = React.useState(null)

  //fetch data when page is loading 
  React.useEffect(()=>{
    fetch(`/api/vans/${params.id}`)
    .then(response => response.json())
    .then(data => setVanData(data.vans))
    
  },[params.id])
  
  console.log(vanData)

  return(
    <>
      {vanData? 
        <div>
          <div className='detail-back-container'>
            <p className='arrow'> &larr; </p>
            <Link to='/host/host-vans' className='detail-back-button'>Back to all vans</Link>
          </div> 
          <div className="host-van-detail-container">
            <div className="host-van-detail-label-container">
              <img className="host-van-detail-image-icon" src={vanData.imageUrl}/>
            </div>
          </div>
        </div>
        
        
      : <div className='loading-container'>
          <h1>Loading...</h1>
        </div>
      }
    </>
  )
}