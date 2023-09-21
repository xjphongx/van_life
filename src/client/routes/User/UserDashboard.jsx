import React from "react"
import {useLocation,NavLink,Await,defer,useLoaderData} from "react-router-dom"
import { requireAuth } from "../../utils";
import { LoginContext } from "../..";
import { getUserDashboardInfo } from "../../../server/api";


export async function loader({request}){
  const user = await requireAuth(request)
  return defer({userInfo:getUserDashboardInfo(user.id)})
}

export default function UserDashboard(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn("User") //fixes the component and bad state error
    localStorage.setItem("loginType", "user")
  },[])
  const dataPromise = useLoaderData()

  const renderUserDashboard = (userInfo)=>{
    console.log(userInfo)
    const userRequests = userInfo.userRequests

    let requestCounter=0;
    const renderDashboardUserRequestElements = userRequests.map((request)=>{
      if(requestCounter<4){
        requestCounter+=1
        return(
        <div key={request._id} className="user-dashboard-request-tile">
          <h2>A user has sent a request for {request.requestedVanName} </h2>
          <NavLink to='request' 
          className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}
          state={request}
          >Details</NavLink>
        </div>
      )
      } else {
        return
      }
    })


    return(
      <>
        {/* Welcome */}
        <div className="user-dashboard-welcome-container">
          <h1>Welcome!</h1>
          <div className="user-dashboard-welcome-detail-container"></div>
        </div>

        {/* current van rented status */}
        <div className="user-dashboard-van-container">
          <div>
            <h2>Current Van Rented</h2>
            <div>
              <h3>Dreamcatcher</h3>
              <h3>Example Van image</h3>
            </div>
          </div>
          <NavLink to='van' className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}>See Details</NavLink>
        </div>

        {/* User van requests */}
        <div className='host-dashboard-request-container'>
          <div className="host-dashboard-request-detail-container">
            <h2>Your Requests</h2>
            <NavLink to='request' className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}> See All Request</NavLink>
          </div>
          <div className="host-dashboard-request-list-container">
            {renderDashboardUserRequestElements}
          </div>
        </div>
      </>
    )
  }

  return(
    <div className="dashboard-container">
        <React.Suspense fallback={<h1>Loading Dashboard...</h1>}>
          <Await resolve={dataPromise.userInfo}>
            {renderUserDashboard}
          </Await>
        </React.Suspense> 
    </div>
  )
}