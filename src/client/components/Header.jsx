import React from "react";
import Navbar from "./Navbar";


export default function Header({props}){
  console.log(props)
  
  return(<>
    <header className="header-section">
      <Navbar props={props} />
    </header>
  </>)
}