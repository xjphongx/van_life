import React from "react"
import {NavLink,Await,defer,useLoaderData} from "react-router-dom"
import { requireAuth } from "../../utils";
import {AiFillStar} from "react-icons/ai"
import { getHostInfo } from "../../../server/api";

export async function loader({request}){
  const user = await requireAuth(request)
  console.log(user)
  return defer({hostInfo:getHostInfo(user.id)})
}

export default function Dashboard(){
  /* const contextData = useContext()
  console.log(contextData) */
  const dataPromise = useLoaderData()//getting deferred data from the loader 
  


  /* rendering listed vans */
  function renderHostDashboard(hostInfo){
    console.log(hostInfo)
    return(
      <>
        {/* Income */}
        <div className="host-dashboard-income-container">
          <h1>Welcome!</h1>
          <div className="host-dashboard-income-detail-container">
            <h4>Total Income</h4>
            <NavLink className="host-dashboard-detail-link"> details</NavLink>
          </div>
          <h1>$2280</h1>
        </div>
        {/* Review */}
        <div className="host-dashboard-review-container">
          <div className="host-dashboard-review-detail-container">
            <div className="host-dashboard-review-inner-detail-container">
              <h3>Review score</h3>
              <AiFillStar size={25} className="host-review-gold-star"/>
              <h4>5.0<span>/5</span></h4>
            </div>
            <NavLink className="host-dashboard-detail-link"> details</NavLink>
          </div>
        </div>
        {/* Request */}
        <div className='host-dashboard-request-container'>
          <div className="host-dashboard-request-detail-container">
            <h3>Your Requests (5)</h3>
            <NavLink className="host-dashboard-detail-link"> details</NavLink>
          </div>
          <div className="host-dashboard-request-list-container">
            <h1>request 1</h1>
            <h1>request 2</h1>
          </div>
            
        </div>

        {/* Listed van */}
        <div className="host-dashboard-listed-vans-container">
          <div className="host-dashboard-listed-van-detail-container">
            <h3>Your listed vans</h3>
            <NavLink className="host-dashboard-detail-link"> details</NavLink>
          </div>
          <div className="host-dashboard-van-list-container">

          </div>

        </div>
        
        
        
        
      </>
    )
  }


  return (
    <>
      <div className="host-dashboard-container">
          <React.Suspense fallback={<h1>Loading Dashboard...</h1>}>
            <Await resolve={dataPromise.hostInfo}>
              {renderHostDashboard}
            </Await>
          </React.Suspense> 
      </div>

    </>
  )
}