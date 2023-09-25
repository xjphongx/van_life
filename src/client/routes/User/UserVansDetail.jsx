import React from "react"
import {Link, NavLink, Outlet, useParams,useLoaderData,defer, Await,useLocation } from "react-router-dom";
import { requireAuth } from "../../utils"
import { getUserVan } from "../../../server/api"
import { LoginContext } from "../..";

export async function loader({params, request}){
  const user = await requireAuth(request)
  return defer({userVan:getUserVan(params.id)})
}

export default function UserVansDetail(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn("User") //fixes the component and bad state error
    localStorage.setItem("loginType", "user")
  },[])
  const dataPromise = useLoaderData()

  function renderUserVanDetail(userVan){
    //Keep the state search params the same from one page to another
    const location = useLocation()
    const search = location.state? location.state.search: ""
    const type = location.state.type? location.state.type:"all"
    return(
      <>
        <div className='user-detail-back-container'>
          <p className='arrow'> &larr; </p>
          <Link to={`..${search}`} 
            relative="path" //tell react to go back in one level in PATH and NOT in ROUTE hierarchy
            className='detail-back-button'>Back to {type} vans
          </Link>
        </div> 

        <section className="user-van-detail-container">
          {/* This is the container for the van images and labels  */}
          <div className="user-van-detail-label-container">
            <div >
              <img className="user-van-detail-image-icon" src={userVan.imageUrl[0]}/>
              <div className="vertical-container">
                <div className={`user-type-tag-${userVan.type}`}>{userVan.type}</div>
                <h1>{userVan.name}</h1>
                <p className= 'detail-info-price'>${userVan.price} <span>/day</span></p>
              </div>
            </div>
            {userVan.avaliable?
            <Link 
              to={`../vans/rent/${userVan._id}`} 
              className='navlink-rent-button'>Rent this van
            </Link>
            : <p>{userVan.name} is not avaliable to rent</p>
            }
            
          </div>

          

          {/* Everything below to other comment line... Is a van detail layout */}
          <nav className="user-subnavbar-container">
              <NavLink
                to='.' end
                className={({isActive})=>isActive? "active-user-link-route" :"pending-user-link-route"}
              >Details</NavLink>
              <NavLink
                to='pricing'
                className={({isActive})=>isActive? "active-user-link-route" :"pending-user-link-route"}
              >Pricing</NavLink>
              <NavLink
                to='photos'
                className={({isActive})=>isActive? "active-user-link-route" :"pending-user-link-route"}
              >Photos</NavLink>

            </nav>
            {/* To this comment line above */}
            <Outlet context={userVan}/> {/* passing context like a prop but uses a method to get context */}
        </section>
      </>
    )
  }


  return(
    <div className='detail-page-container'>
      <React.Suspense fallback={<h1>Loading Host's Van detail...</h1>}>
        <Await resolve={dataPromise.userVan}>
          {renderUserVanDetail}
        </Await>
      </React.Suspense>
        
      </div>
  )
}