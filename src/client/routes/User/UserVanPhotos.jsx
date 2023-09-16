import React from "react"
import { useOutletContext } from "react-router-dom";
import * as uuid from "uuid"

export default function UserVanPhotos(){
  const [van, setVan] = React.useState(useOutletContext())
  const renderVanImagesElements = van.imageUrl.map((image)=>{
    return(
      <img key={uuid.v4} className="user-single-photo" src={image}/>
    )
  })

  return(
    <section className="user-van-photo-container">
      {renderVanImagesElements}
      
    </section>
  )
}