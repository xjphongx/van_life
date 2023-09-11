import React from "react"
import {useLoaderData,defer, Await,NavLink} from "react-router-dom"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";
import { getHostRequests } from "../../../server/api";

export async function loader({request}){
  const user = await requireAuth(request)
  console.log(user)
  return defer({hostRequests:getHostRequests(user.id)})
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

  const renderRequestElements = (hostRequests) =>{
    console.log(hostRequests)

    const requestElements = hostRequests.map((request)=>{
      console.log(request)
      return(
        <li key={request._id} className="host-request-tile">
          <div className="host-request-submit-container">
            <p className="host-request-label">
            {`${request.requestedUserFirstName} ${request.requestedUserLastName}`} sents a request for  {request.requestedVanName}
            </p>
            <p>Submission Date: {request.submissionDate}</p>
          </div>
          
          <NavLink to={request._id} 
            className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
            >Details</NavLink>
      </li>
      )
    })



    return(
      <>
        <h1>Your Requests ({hostRequests.length})</h1>
        <div className="host-request-list-scroller">
        {requestElements}
       </div>
      </>
      
    )
  }


  return(
    <>
      <div className="host-request-container">
        
          <React.Suspense fallback={<h1>Loading Requests...</h1>}>
            <Await resolve={dataPromise.hostRequests} >
                {renderRequestElements}
            </Await>
          </React.Suspense>
      </div>
    </>
  )
}