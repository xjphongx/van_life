import React from "react"
import {useLoaderData,Await, defer,Link} from "react-router-dom"
import { requireAuth } from "../../utils"
import { getUserVan } from "../../../server/api"

export async function loader({params,request}){
  const user = await requireAuth(request)
  return defer({userVan:getUserVan(params.id)})
}

export default function UserVanRent(){
  const dataPromise = useLoaderData()
  
  function renderUserVanDetail(userVan){
    return(
      <>
        <div className='user-detail-back-container'>
          <p className='arrow'> &larr; </p>
          <Link to={`/user/vans/${userVan._id}`}
            relative="path" //tell react to go back in one level in PATH and NOT in ROUTE hierarchy
            className='detail-back-button'>Back to {userVan.name} details
          </Link>
        </div> 

        <section className="user-van-detail-container">
          {/* This is the container for the van images and labels  */}
          <div className="user-van-detail-label-container">
            <div>
              <img className="user-van-detail-image-icon" src={userVan.imageUrl[0]}/>
              <div className="vertical-container">
                <div className={`user-type-tag-${userVan.type}`}>{userVan.type}</div>
                <h1>{userVan.name}</h1>
                <p className= 'detail-info-price'>${userVan.price} <span>/day</span></p>
              </div>
            </div>

          </div>

        </section>

        <section className="user-van-rent-form-container">

        </section>


      </>
    )
  }
  
  
  
  return(
    <div className='detail-page-container'>
      <React.Suspense fallback={<h1>Loading Van detail...</h1>}>
        <Await resolve={dataPromise.userVan}>
          {renderUserVanDetail}
        </Await>
      </React.Suspense>
        
      </div>
  )
}