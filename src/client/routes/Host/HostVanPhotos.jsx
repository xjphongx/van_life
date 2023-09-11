import React from "react";
import { useOutletContext } from "react-router-dom";
import * as uuid from "uuid"


export default function HostVanPhotos(){
  /* React.useLayoutEffect(() => {
    window.scrollTo(0, 130)
  }); */
  const [van, setVan] = React.useState(useOutletContext())
  const renderVanImagesElements = van.imageUrl.map((image)=>{
    return(
      <img key={uuid.v4()} className="host-single-photo" src={image}/>
    )
    
  })
  return(
    <section className="host-van-photo-container">
      {renderVanImagesElements}
    </section>
  )
}