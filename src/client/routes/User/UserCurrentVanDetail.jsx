import React from "react"
import {Link, NavLink, Outlet, useParams,useLoaderData,defer, Await } from "react-router-dom";
import { requireAuth } from "../../utils";
import { LoginContext } from "../..";
import { getRequest } from "../../../server/api";
import { updateRequestStatus } from "../../../server/api";
import moment from "moment"


export function loader({request}){

}


export default function UserCurrentVanDetail(){

  return(
    <>
      <h1>current van here</h1>
    </>
  )
}