import React from "react"
import {Link, NavLink, Outlet, useParams,useLoaderData,defer, Await } from "react-router-dom";
import { requireAuth } from "../../utils";
import { LoginContext } from "../..";
import { getRequest } from "../../../server/api";
import moment from "moment"


export async function loader({ params, request}){
  const user = await requireAuth(request)
  return defer({userRequest:getRequest(params.id)})
}

export default function UserRequestDetail(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn(true) //fixes the component and bad state error
    localStorage.setItem("loginType", "host")
  },[])
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0)
  });
  
  const dataPromise = useLoaderData()
 
  const renderUserRequestDetail = (userRequest) => {
    const request = userRequest.request
    const van = userRequest.requestedVan
    const startDate = moment(new Date(request.requestedDatesArray[0])).format("MMM Do, YYYY")
    const endDate = moment(new Date(request.requestedDatesArray[request.requestedDatesArray.length-1])).format("MMM Do, YYYY")
    return(
      <>
        <div className='user-detail-back-container'>
          <p className='arrow'> &larr; </p>
          <Link to='/user/request' 
            relative="path" //tell react to go back in one level in PATH and NOT in ROUTE hierarchy
            className='detail-back-button'>Back to all requests
          </Link>
        </div>
        <section className='user-request-detail-page-container'>
          <div className="user-request-detail-container">
            <div className="user-request-info-container">
              <h4>Request Id: {request._id}</h4>
              <p>{request.requestedUserFirstName} 
                {request.requestedUserLastName} is requesting {request.requestedVanName}
              </p>
              <div className="user-request-daterange-container">
                <h4>Start: {startDate} </h4>
                <h4>End: {endDate}</h4>
              </div>
            </div>
            <div className="user-request-user-detail-container"> 
              <h3>User's Request Response</h3>
              <pre>{request.description}</pre>
            </div>
            <div className="user-request-status-container">
                {request.status==="accept"? <h1 className="user-accept-status">Accepted</h1> 
                :request.status==="reject"? <h1 className="user-reject-status">Rejected</h1>
                :<h1 className="user-pending-status">Pending</h1> }
            </div>
          </div>
          
          <div className="user-van-detail-label-container">
            <div>
              <img className="user-van-detail-image-icon" src={van.imageUrl[0]}/>
              <div className="vertical-container">
                <div className={`host-type-tag-${van.type}`}>{van.type}</div>
                <h1>{van.name}</h1>
                <p className= 'detail-info-price'>${van.price} <span>/day</span></p>
              </div>
            </div>
            
          </div>
          <nav className="user-subnavbar-container">
              <NavLink
                to='.' end
                className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
      
              >Details</NavLink>
              <NavLink
                to='pricing'
                className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
              >Pricing</NavLink>
              <NavLink
                to='photos'
                className={({isActive})=>isActive? "active-host-link-route" :"pending-host-link-route"}
              >Photos</NavLink>
            </nav>
           
            <Outlet context={van}/>
            
            
            
            
        </section>
      </>
    )
  }


  
  return(
    <>
      <div className='detail-page-container'>
      <React.Suspense fallback={<h1>Loading request details...</h1>}>
        <Await resolve={dataPromise.userRequest}>
          {renderUserRequestDetail}
        </Await>
      </React.Suspense>
    </div>
    </>
  )
}