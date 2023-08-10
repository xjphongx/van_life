import React from "react";
import { useOutletContext } from "react-router-dom";


export default function HostVanPricing(){
  const [van, setVan] = React.useState(useOutletContext())
  return (
    <p className="host-van-pricing">
      ${van.price}<span>/day</span>
    </p>
  )
}