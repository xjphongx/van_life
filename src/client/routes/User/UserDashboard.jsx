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

    return(
      <>
        {/* Current Van rented status */}
        <div className="user-dashboard-van-container">
          <h1>Welcome!</h1>
          <div className="user-dashboard-van-detail-container">
            <h2>Current Van Rented</h2>
            <NavLink to='income' className={({isActive})=> isActive ? "active-nav-link-route" :"pending-nav-link-route"}>See Details</NavLink>

          </div>
          <h2>Example Van image</h2>
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