import React from "react";
import { useParams } from "react-router-dom";

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
        <h1>hello</h1>
      : <div className="loading-container">
          <h1>Loading...</h1>
        </div>
      }
    </>
  )
}