import React from "react";
import { useRouteError } from "react-router-dom"; //import this Hook for error handling


export default function Error(){
  const error = useRouteError()
  console.log(error)
  return(
    <>
      <h1>An error has occured.</h1>
      <br></br>
      <h1>Error: {error.message}</h1>
      <h2>Status: {error.status}</h2>
      <h2>Text: {error.statusText}</h2>
    </>
  )
}