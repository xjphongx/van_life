import React from "react"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";

export async function loader({request}){


}

export default function UserRequest(){
  return(
    <>
      <h1>Request</h1>
    </>
  )
}