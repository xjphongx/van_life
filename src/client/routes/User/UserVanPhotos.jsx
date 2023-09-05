import React from "react"
import { useOutletContext } from "react-router-dom";

export default function UserVanPhotos(){
  const [van, setVan] = React.useState(useOutletContext())
  console.log(van)

  const renderVanImagesElements = van.imageUrl.map((image)=>{
    return(
      <img className="user-single-photo" src={image}/>
    )
    
  })

  return(
    <section className="user-van-photo-container">
      {renderVanImagesElements}
      
    </section>
  )
}