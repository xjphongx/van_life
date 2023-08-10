import React from "react";
import { useOutletContext } from "react-router-dom";


export default function HostVanPhotos(){
  const [van, setVan] = React.useState(useOutletContext())
  return(
    <section className="host-van-photo-container">
      <img className="host-single-photo" src={van.imageUrl}/>
    </section>
  )
}