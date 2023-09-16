import React from "react"
import {useLoaderData,defer, Await,NavLink} from "react-router-dom"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";
import { getAllUserRequests } from "../../../server/api";

export async function loader({request}){
  const user = await requireAuth(request)
  return defer({userRequests:getAllUserRequests(user.id)})
}

export default function UserRequest(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn("User") //fixes the component and bad state error
    localStorage.setItem("loginType", "user")
  },[])

  const dataPromise = useLoaderData()

  const renderUserRequests = (userRequests) =>{

    const requestElements = userRequests.map((request)=>{
      return(
        <li key={request._id} className="user-request-tile">
          <div className="user-request-submit-container">
            <p className="user-request-label">
            {`${request.requestedUserFirstName} ${request.requestedUserLastName}`} sents a request for  {request.requestedVanName}
            </p>
            <p>Submission Date: {request.submissionDate}</p>
            <p>Status: {request.status==="accept"?"Accepted": request.status==="reject"?"Rejected":"Pending..."}</p>
          </div>
          
          <NavLink to={request._id} 
            className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
            >Details</NavLink>
      </li>
      )
    })


    return(
      <>
        <h1>Your Requests ({userRequests.length})</h1>
        <div className="request-list-scroller">
        {requestElements}
       </div>
      </>
    )
  }



  return(
    <>
      <div className='detail-page-container'>
        <React.Suspense fallback={<h1>Loading User Requests...</h1>}>
          <Await resolve={dataPromise.userRequests}>
            {renderUserRequests}
          </Await>
        </React.Suspense>
    </div>
    </>
  )
}