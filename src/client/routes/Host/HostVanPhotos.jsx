import React from "react";
import { useOutletContext } from "react-router-dom";


export default function HostVanPhotos(){
  const [van, setVan] = React.useState(useOutletContext())
  const renderVanImagesElements = van.imageUrl.map((image)=>{
    return(
      <img className="host-single-photo" src={image}/>
    )
    
  })
  return(
    <section className="host-van-photo-container">
      {renderVanImagesElements}
    </section>
  )
}