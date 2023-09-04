import React from "react"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";

export async function loader({request}){


}

export default function UserRequest(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn("User") //fixes the component and bad state error
    localStorage.setItem("loginType", "user")
  },[])

  return(
    <>
      <h1>Request</h1>
    </>
  )
}