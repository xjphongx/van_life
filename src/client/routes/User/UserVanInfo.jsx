import React from "react"
import { useOutletContext } from "react-router-dom"; 

export default function UserVanInfo(){
  const [van, setVan]= React.useState(useOutletContext())//this is not the same as props so i have to use the outlet's context
  return(
    <main className="user-van-info-container">
      <h4>Name: <span>{van.name}</span></h4>
      <h4>Category: <span>{van.type}</span></h4>
      <h4>Description: <span>{van.description}</span></h4>
      <h4>Visibility: <span>{van.visiblity}</span></h4>
    </main>
  )
}