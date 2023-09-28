import React from "react"
import {useLoaderData, defer, Await,NavLink, Link, useSearchParams} from "react-router-dom"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";
import { getArchivedRequests,updateRequestArchiveStatus } from "../../../server/api";

export async function loader({request}){
  const user = await requireAuth(request)
  return defer({archivedRequests: getArchivedRequests(user.id)})
}


export default function HostArchive(){
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

  const submitRequestArchiveUpdate = async (requestId, archiveStatus) => {
    //update the request isArchive prop to true
    try{
      const updatedData = await updateRequestArchiveStatus(requestId, archiveStatus)
      window.location.reload(false);
    }catch(err){
      console.log(err)
    }
  }



  const renderHostArchive = (archivedRequests) => {
    console.log(archivedRequests)

    const requestElements = archivedRequests.map((request)=>{
      return(
        <li key={request._id} className="host-request-tile">
        <div className="host-request-submit-container">
          <p className="host-request-label">
          {`${request.requestedUserFirstName} ${request.requestedUserLastName}`} sents a request for  {request.requestedVanName}
          </p>
          <p>Submission Date: {request.submissionDate}</p>
          <p>Status: <span className={`status-${request.status}`}>{request.status==="accept"?"Accepted": request.status==="reject"?"Rejected":"Pending..."} </span></p>
        </div>
        <div className="detail-archive-container">
          <NavLink to={request._id} 
            className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
            >Details</NavLink>
          <button className="archive-button" onClick={()=>{
            submitRequestArchiveUpdate(request._id, request.isArchived)}}>Unarchive</button>
        </div>  
    </li> 
    )
    })


    return(
      <>
        <div className='host-archive-back-container'>
          <p className='arrow'> &larr; </p>
          <Link to='..' 
            relative="path" //tell react to go back in one level in PATH and NOT in ROUTE hierarchy
            className='detail-back-button'>Back to all requests
          </Link>
        </div>
        <h1>Request Archive</h1>

        <div className="request-header-container">
          <div className="filter-request-container">
          <p>Filter By:</p>
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
            <p>Sort By:</p>
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
      <div className='archive-container'>
      <React.Suspense fallback={<h1>Loading request details...</h1>}>
        <Await resolve={dataPromise.archivedRequests} >
          {renderHostArchive}
        </Await>
      </React.Suspense>
    </div>
    </>
  )
}