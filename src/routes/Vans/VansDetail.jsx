import React from "react";
import { useParams, Link, useLocation, useLoaderData } from "react-router-dom";
import { getVans } from "../../../api";


//this loader function will load van data that matches the params.id
export function loader({params}){
  //console.log(params)
  return getVans(params.id)
}


export default function VansDetail(){
  //get loaderdata
  const vanData = useLoaderData()

  //get the parameters from the url
  const params = useParams()

  const location = useLocation() 
  //console.log(location) //will return a object with pathname, search, and Link state that was pass from previous page

  //Link State History Concept
  const search = location.state? location.state.search : "" //this will go to the Link below as a to prop

  //use a ternary operator to find the type of van based on link state
  const type = location.state.type ? location.state.type : "all" 

  return(
    <>
      <div className='main-section'>
          <div className='detail-page-container'>
            <div className='detail-back-container'>
              <p className='arrow'> &larr; </p>
              <Link to={`..${search}`} relative="path" className='detail-back-button'>Back to {type} Vans</Link>
            </div>
            <div className='detail-info-container'>
              <img className='detail-image' src={vanData.imageUrl} />
              <div className='detail-info'>
                <p className={`van-type ${vanData.type}`}>{vanData.type}</p>
                <h1>{vanData.name}</h1>
                <p className= 'detail-info-price'>${vanData.price} <span>/day</span></p>
                <p className= 'detail-info-description'>{vanData.description}</p>
                <button className='rent-button'>Rent this van</button>
              </div>
            </div>
          </div>
       </div>
    </>
  )
}