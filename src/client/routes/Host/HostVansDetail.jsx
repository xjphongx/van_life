import React from "react";
import {Link, NavLink, Outlet, useParams,useLoaderData,defer, Await } from "react-router-dom";
import { getHostVan } from "../../../server/api";
import { requireAuth } from "../../utils";
import { LoginContext } from "../..";

//get host van data with loader
export async function loader({params, request}){
  const user = await requireAuth(request)
  return defer({hostVan:getHostVan(params.id)})
}

export default function HostVansDetail(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn(true) //fixes the component and bad state error
    localStorage.setItem("loginType", "host")
  },[])
  /* React.useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }); */
  //const params = useParams()
  const dataPromise = useLoaderData()


  //helper render function for Suspense, await, and defer
  function renderHostVanDetail(hostVan){
    //console.log(hostVan)
    return(
      <>
        {/* This it the back to all vans button until line 40  */}
        <div className='host-detail-back-container'>
          <p className='arrow'> &larr; </p>
          <Link to='/host/vans' 
            relative="path" //tell react to go back in one level in PATH and NOT in ROUTE hierarchy
            className='detail-back-button'>Back to all vans
          </Link>
        </div> 
        <section className="host-van-detail-container">
          {/* This is the container for the van images and labels  */}
          <div className="host-van-detail-label-container">
            <div>
              <img className="host-van-detail-image-icon" src={hostVan.imageUrl[0]}/>
              <div className="vertical-container">
                <div className={`host-type-tag-${hostVan.type}`}>{hostVan.type}</div>
                <h1>{hostVan.name}</h1>
                <p className= 'detail-info-price'>${hostVan.price} <span>/day</span></p>
              </div>
            </div>
            
          </div>
          {/* Everything below to other comment line... Is a van detail layout */}
          <nav className="host-subnavbar-container">
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
            {/* To this comment line above */}
            <Outlet context={hostVan}/> {/* passing context like a prop but uses a method to get context */}
        </section>
      </>
    )
  }


  return(
    <>
      <div className='detail-page-container'>
      <React.Suspense fallback={<h1>Loading Host's Van detail...</h1>}>
        <Await resolve={dataPromise.hostVan}>
          {renderHostVanDetail}
        </Await>
      </React.Suspense>
        
      </div>
    </>
  )
}


