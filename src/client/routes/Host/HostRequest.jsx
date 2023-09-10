import React from "react"
import {useLoaderData,defer, Await,NavLink} from "react-router-dom"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";

export async function loader({request}){
  const user = await requireAuth(request)
  //return defer({hostRequests:getHostRequests()})
}


export default function HostRequest(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn(true) //fixes the component and bad state error
    localStorage.setItem("loginType", "host")
  },[])
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  const dataPromise = useLoaderData()

  const renderRequestElements = () =>{
    return(
      <div className="host-request-tile">
        <img/>
        <div>
          Jamie wants to request to rent Modesty Explorer
        </div>
        <NavLink to='request' 
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
          >Details</NavLink>
      </div>
        
      
    )
  }


  return(
    <>
      <div className="host-request-container">
        <h1>Your Requests</h1>
        <div className="host-request-list-container">
          <React.Suspense fallback={<h1>Loading Reviews...</h1>}>
            <Await >
                {renderRequestElements}
            </Await>
          </React.Suspense>
        </div>
      </div>
    </>
  )
}