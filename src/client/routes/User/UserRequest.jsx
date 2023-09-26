import React from "react"
import {useLoaderData,defer, Await,NavLink, useSearchParams} from "react-router-dom"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";
import { getAllUserRequests } from "../../../server/api";
import moment from "moment"

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
  const [searchParams, setSearchParams] = useSearchParams()
  const statusFilter = searchParams.get("status")
  const dateFilter = searchParams.get("date")

  const renderUserRequests = (userRequests) =>{
    //Sort the user Request by date
    console.log(userRequests)
    
    const requestElements = userRequests.map((request)=>{
      //console.log(request)
      const startDate = moment(new Date(request.requestedDatesArray[0])).format("MMM Do, YYYY")
      const endDate = moment(new Date(request.requestedDatesArray[request.requestedDatesArray.length-1])).format("MMM Do, YYYY")
      return(
        <li key={request._id} className="user-request-tile">
          <div className="user-request-submit-container">
            <p className="user-request-label"> Van Name: {request.requestedVanName}</p>
            <p>Requested Dates: {`${startDate} to ${endDate}`}</p>
            <p>Submission Date: {request.submissionDate}</p>
            <p>Status: <span className={`status-${request.status}`}>{request.status==="accept"?"Accepted": request.status==="reject"?"Rejected":"Pending..."} </span></p>
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
        <div className="request-header-container">
          <div className="filter-request-container">
            <p>Sort By:</p>
            <button onClick={()=>{
                searchParams.set("status","accept")
                setSearchParams(searchParams)
              }} 
              className={`filter-button Accept ${statusFilter==="accept"?"selected":""}`}
              >Accepted</button> 
            <button onClick={()=>{
                searchParams.set("status","reject")
                setSearchParams(searchParams)
              }} 
              className={`filter-button Reject ${statusFilter==="reject"?"selected":""}`}
              >Rejected</button>
            <button onClick={()=>{
                searchParams.set("status","pending")
                setSearchParams(searchParams)
              }} 
              className={`filter-button Pending ${statusFilter==="pending"?"selected":""}`}
              >Pending</button>
          </div>
          <div className="filter-date-container">
            <button onClick={()=>{
                searchParams.set("date","newest")
                setSearchParams(searchParams)
              }}
              className={`filter-button Newest ${dateFilter==="newest"?"selected":""}`}
              >Newest</button> 
            <button onClick={()=>{
                searchParams.set("date","oldest")
                setSearchParams(searchParams)
              }}
              className={`filter-button Oldest ${dateFilter==="oldest"?"selected":""}`}
              >Oldest</button> 
          </div>
          {(statusFilter||dateFilter)&&<button onClick={()=>setSearchParams({})} className='clear-filter-button'>Clear filters</button>}
        </div>
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