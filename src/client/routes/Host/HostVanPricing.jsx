import React from "react";
import { useOutletContext } from "react-router-dom";


export default function HostVanPricing(){
  /* React.useLayoutEffect(() => {
    window.scrollTo(0, 130)
  }); */
  const [van, setVan] = React.useState(useOutletContext())
  return (
    <p className="host-van-pricing">
      ${van.price}<span>/day</span>
    </p>
  )
}