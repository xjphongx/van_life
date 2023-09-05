import React from "react"
import { useOutletContext } from "react-router-dom";


export default function UserVanPricing(){
  const [van, setVan] = React.useState(useOutletContext())
  return (
    <p className="user-van-pricing">
      ${van.price}<span>/day</span>
    </p>
  )
}