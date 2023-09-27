import React from "react"
import {useLoaderData,defer, Await,NavLink,useSearchParams} from "react-router-dom"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";
import { getHostRequests } from "../../../server/api";

export async function loader({request}){
  const user = await requireAuth(request)
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
  const [searchParams, setSearchParams] = useSearchParams()
  const statusFilter = searchParams.get("status")
  const dateFilter = searchParams.get("date")

  const renderRequestElements = (hostRequests) =>{
    //filter the status type
    let filterRequestsList = statusFilter 
      ? hostRequests.filter(request=>request.status === statusFilter) 
      : hostRequests
    
    //sort by least and greatest date
    filterRequestsList = dateFilter==="newest" 
      ? filterRequestsList.sort((a,b)=>{
        return new Date(a.requestedDatesArray[0]) - new Date(b.requestedDatesArray[0])
      })
      : dateFilter==="oldest" 
      ? filterRequestsList.sort((b,a)=>{
        return new Date(a.requestedDatesArray[0]) - new Date(b.requestedDatesArray[0])
      })
      : filterRequestsList




    const requestElements = filterRequestsList.map((request)=>{
      return(
        <li key={request._id} className="host-request-tile">
          <div className="host-request-submit-container">
            <p className="host-request-label">
            {`${request.requestedUserFirstName} ${request.requestedUserLastName}`} sents a request for  {request.requestedVanName}
            </p>
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
        <h1>Your Requests ({hostRequests.length})</h1>
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