import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function HostVanUpload(){
  const location = useLocation()
  console.log(location)
  const search = location.state? loaction.state.search : ""
  return(
    <>
      <div className='detail-back-container'>
        <p className='arrow'> &larr; </p>
        <Link to={`..${search}`} relative="path" className='detail-back-button'>Back to Host Vans</Link>
      </div>
    </>
  )
}