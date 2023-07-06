import React from "react";
import { useParams, Link } from "react-router-dom";

export default function VansDetail(){
  //get the parameters from the url
  const params = useParams()
  console.log(params.id)

  const [vanData, setVanData] = React.useState(null)

  //fetch the data from miragejs when the page finished loading
  React.useEffect(()=>{
    async function getVanDetail(id){
        //make a fetch request to miragejs server and get the data again
        const response = await fetch(`/api/vans/${id}`)
        const data = await response.json()
        setVanData(data.vans)
        console.log(vanData)
    }
    getVanDetail(params.id)
  },[params.id])//reloads the page when params.id in url changes
  


  return(
    <>
      {vanData ?  
        <div className='detail-page-container'>
          <div className='detail-back-container'>
            <p className='arrow'> &larr; </p>
            <Link to='/vans' className='detail-back-button'>Back to all vans</Link>
          </div>
          <div className='detail-info-container'>
            <img className='detail-image' src={vanData.imageUrl} />
            <div className='detail-info'>
              <p className={`type-tag-${vanData.type}`}>{vanData.type}</p>
              <h1>{vanData.name}</h1>
              <p className= 'detail-info-price'>${vanData.price} <span>/day</span></p>
              <p className= 'detail-info-description'>{vanData.description}</p>
              <button className='rent-button'>Rent this van</button>
            </div>
          </div>
        </div>
          
       
      : <div className='loading-container'>
          <h1>Loading...</h1>
        </div>
      }
    </>
  )
}