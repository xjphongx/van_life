import React from "react";
import { useParams, Link, useLocation, useLoaderData, defer,Await } from "react-router-dom";
import { getVans } from "../../server/api";



//this loader function will load van data that matches the params.id
export function loader({params}){
  //console.log(params)
  return defer({van: getVans(params.id)}) //{vans: get a promise for vans data}
}


export default function VansDetail(){
  //get loaderdata() which will receive a promise of the data
  const dataPromise = useLoaderData()
  console.log(dataPromise)
  //get the parameters from the url
  //const params = useParams()

  //helper function to render the van elements when defering data
  function renderVanDetail(van){ //resolve={dataPromise} will return a van object
    console.log(van)
    
    const location = useLocation() 
    //console.log(location) //will return a object with pathname, search, and Link state that was pass from previous page

    //Link State History Concept
    const search = location.state? location.state.search : "" //this will go to the Link below as a to prop

    //use a ternary operator to find the type of van based on link state
    const type = location.state.type ? location.state.type : "all" 


    return(
      
        <>
          <div className='detail-back-container'>
            <p className='arrow'> &larr; </p>
            <Link to={`..${search}`} relative="path" className='detail-back-button'>Back to {type} Vans</Link>
          </div>
          <div className='detail-info-container'>
            <img className='detail-image' src={van.imageUrl} />
            <div className='detail-info'>
              <p className={`van-type ${van.type}`}>{van.type}</p>
              <h1>{van.name}</h1>
              <p className= 'detail-info-price'>${van.price} <span>/day</span></p>
              <p className= 'detail-info-description'>{van.description}</p>
              <button className='rent-button'>Rent this van</button>
            </div>
          </div>
        </>
          
        
      
    )
    
  }

  return(
    <div className='detail-page-container'>
      <React.Suspense fallback={<h1>Loading Van Detail...</h1>}>
        <Await resolve={dataPromise.van}>
          {renderVanDetail}
        </Await>
      </React.Suspense>
    </div>
  )
}