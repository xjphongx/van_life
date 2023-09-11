import React from "react"
import {Link, NavLink, Outlet, useParams,useLoaderData,defer, Await } from "react-router-dom";
import { requireAuth } from "../../utils";
import { LoginContext } from "../..";
import { getHostRequest } from "../../../server/api";
import { updateRequestStatus } from "../../../server/api";
import moment from "moment"

export async function loader({params, request}){
  const user = await requireAuth(request)
  return defer({hostRequest:getHostRequest(params.id)})
}



export default function HostRequestDetail(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn(true) //fixes the component and bad state error
    localStorage.setItem("loginType", "host")
  },[])
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });

  const dataPromise = useLoaderData()
  const [status, setStatus] = React.useState(null)


  const renderHostRequestDetail = (hostRequest)=>{
    const request = hostRequest.request
    const van = hostRequest.requestedVan
    console.log(request)
    console.log(van)
    const startDate = moment(new Date(request.requestedDatesArray[0])).format("MMM Do, YYYY")
    const endDate = moment(new Date(request.requestedDatesArray[request.requestedDatesArray.length-1])).format("MMM Do, YYYY")
    
    
    //handle accept submit button
    const handleSubmit = async (e,request)=>{
      //e.preventDefault()
      console.log("accepting request")
      console.log(status)
      try{
        //send the status response to server
        const data = await updateRequestStatus(request._id,request.vanHostId,status)
      }catch(err){
        console.log(err)
      }
    }
    

    
    
    
    return(
      <>
        <div className='host-detail-back-container'>
          <p className='arrow'> &larr; </p>
          <Link to='/host/request' 
            relative="path" //tell react to go back in one level in PATH and NOT in ROUTE hierarchy
            className='detail-back-button'>Back to all requests
          </Link>
        </div> 
        <section className='host-request-detail-container'>
          <div className="host-request-detail-container">
            <div className="host-request-info-container">
              <h4>Request Id: {request._id}</h4>
              <p>{request.requestedUserFirstName} 
                {request.requestedUserLastName} is requesting {request.requestedVanName}
              </p>
              <div className="host-request-daterange-container">
                <h4>Start: {startDate} </h4>
                <h4>End: {endDate}</h4>
              </div>
            </div>
            <div className="host-request-user-detail-container"> 
              <h3>User's Request Response</h3>
              <pre>{request.description}</pre>
            </div>
            
            <form onSubmit={(e)=>{handleSubmit(e,request)}} className="host-request-form-container">
              {request.status==="accept"? <h1>Accepted</h1> : <div className="host-request-button-container">
                <button className="request-accept-button" type="submit" onClick={()=>{setStatus("accept")}}>Accept</button>
                <button className="request-reject-button" type="submit" onClick={()=>{setStatus("reject")}}>Decline</button>
              </div> }
              
            </form>
          </div>
          <div className="host-request-van-detail-container">

          </div>
        </section>
      </>
    )
  }




  return(
    <>
    <div className='detail-page-container'>
      <React.Suspense fallback={<h1>Loading Host's Van detail...</h1>}>
        <Await resolve={dataPromise.hostRequest}>
          {renderHostRequestDetail}
        </Await>
      </React.Suspense>
    </div>
      
    </>
  )
}