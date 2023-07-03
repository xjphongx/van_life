import React from "react";
import { useParams } from "react-router-dom";

export default function VansDetail(){

  //get the parameters from the url
  const params = useParams()
  console.log(params)
  return(
    <>
      <h1>Vans details goes here</h1>
    </>
  )
}