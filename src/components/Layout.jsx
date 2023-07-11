import React from "react";
import { Outlet } from "react-router-dom"; //Use outlet for layour route, used to create a hole for the child route to render

import Header from "./Header";
import Footer from "./Footer";

export default function Layout(){
  return(
    <>
      <Header/>
      <Outlet/> {/* Used to render the desire child path */}
      <Footer/>
    </>
  )
}
/* This is a neater way to organize my components where I want
 the Header and Footer to NOT CHANGE and the outlet provides me 
 a way to inter change different url paths under the same parent */