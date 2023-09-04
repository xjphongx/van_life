import React from "react"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";

export async function loader({request}){


}

export default function UserDashboard(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn("User") //fixes the component and bad state error
  },[])
  return(
    <div className="host-dashboard-container">
       <h1>User dashboard</h1>   
    </div>
  )
}