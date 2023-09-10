import React from "react";
import { LoginContext } from "../..";

export default function HostIncome(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn(true) //fixes the component and bad state error
    localStorage.setItem("loginType", "host")
  },[])
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  
  return (
    <>
      <h1>Income Tab will be designed last</h1>
    </>
  )
}