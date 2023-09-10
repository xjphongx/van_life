import React from "react"
import {useLocation,NavLink,Await,defer,useLoaderData} from "react-router-dom"
import { requireAuth } from "../../utils";
import {AiFillStar} from "react-icons/ai"
import { getHostDashboardInfo} from "../../../server/api";
import { getReviewScore } from "../../utils";
import { LoginContext } from "../..";

export async function loader({request}){
  const user = await requireAuth(request)
  //console.log(user)
  return defer({hostInfo:getHostDashboardInfo(user.id)})
}

export default function HostDashboard(){
  //when the user successfully routes to /host set LoggedIn to true
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn(true) //fixes the component and bad state error
    localStorage.setItem("loginType", "host")
  },[])
  
  
  const dataPromise = useLoaderData()//getting deferred data from the loader 
  

  /* rendering listed vans */
  const renderHostDashboard = (hostInfo)=>{
    const hostUserVans = hostInfo.hostUserVans

    /* code needed to calculate reviews */
    const hostVansWithReviews = hostUserVans.filter((van)=>{
      if(van.hasOwnProperty('reviews')){
        return van
      }
      
    })

    let dashboardReviewScore = getReviewScore(hostVansWithReviews)

    /* code needed to get request */
    const hostUserRequest = hostInfo.hostUser.requests
    /* console.log(hostUserRequest) */

    let requestCounter=0;
    const renderDashboardHostRequestElements = hostUserRequest.map(request=>{
      let requestedVan = hostUserVans.filter((van)=>{
        if(van._id===request.requestedVanId){
          return van
        }
      })
      if(requestCounter<3){
        requestCounter+=1
        return(
        <div key={request._id} className="host-dashboard-request-tile">
          <h2>A user has sent a request for {requestedVan[0].name}</h2>
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



    /* This allows only 3 listed vans to be displayed to the dashboard */
    let vanCounter= 0;
    const renderDashboardHostVansElements = hostUserVans.map(van=>{
      if(vanCounter<3){//limits to 3 vans 
        vanCounter+=1
        return(
        <div key={van._id} className="host-dashboard-host-van-tile">
          <div className="host-dashboard-inner-element-container">
            <img src={van.imageUrl[0]} className="host-dashboard-van-element-image"/>
            <div>
              <h3>{van.name}</h3>
              <h4>${van.price}/day</h4>
            </div>
          </div>
          <NavLink to={`vans/${van._id}`} className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}> Details</NavLink>
        </div>
      )
      }else{
        return
      }
    })

    
    return(
      <>
        {/* Income */}
        <div className="host-dashboard-income-container">
          <h1>Welcome!</h1>
          <div className="host-dashboard-income-detail-container">
            <h2>Total Income</h2>
            <NavLink to='income' className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}>See Income</NavLink>
          </div>
          <h2>$2280</h2>
        </div>

        {/* Review */}
        <div className="host-dashboard-review-container">
          <div className="host-dashboard-review-detail-container">
            <div className="host-dashboard-review-inner-detail-container">
              <h2>Review score</h2>
              <AiFillStar size={25} className="host-review-gold-star"/>
              <h3>{dashboardReviewScore}<span>/5</span></h3>
            </div>
            <NavLink to='review' className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}>See All Reviews</NavLink>
          </div>
        </div>

        {/* Request */}
        <div className='host-dashboard-request-container'>
          <div className="host-dashboard-request-detail-container">
            <h2>Your Requests ({hostUserRequest.length})</h2>
            <NavLink to='request' className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}> See All Request</NavLink>
          </div>
          <div className="host-dashboard-request-list-container">
            {renderDashboardHostRequestElements}
          </div>
            
        </div>

        {/* Listed van */}
        <div className="host-dashboard-listed-vans-container">
          <div className="host-dashboard-listed-van-detail-container">
            <h2>Your listed vans</h2>
            <NavLink to='vans' className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}> See All Vans</NavLink>
          </div>
          <div className="host-dashboard-van-list-element-container">
            {renderDashboardHostVansElements}
          </div>
        </div>
        
      </>
    )
  }


  return (
      <div className="host-dashboard-container">
          <React.Suspense fallback={<h1>Loading Dashboard...</h1>}>
            <Await resolve={dataPromise.hostInfo}>
              {renderHostDashboard}
            </Await>
          </React.Suspense> 
      </div>
  )
}