import React from "react"
import {useLoaderData,Await, defer,Link,Form} from "react-router-dom"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";
import { getUserVan } from "../../../server/api"
import { uploadUserRequest } from "../../../server/api";

import {DateRange} from  'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from "moment"
import * as uuid from "uuid"
import toast,{ Toaster } from "react-hot-toast";


export async function loader({params,request}){
  const user = await requireAuth(request)
  return defer({userVan:getUserVan(params.id)})
}

export async function action({request}){
  const formData = await request.formData()
  const newRequestObject = {

  }
  try{
    const data = await sendUserRequest(newRequestObject)
    console.log(data)
    if(data.error){
      toast.error(data.error)
    }else {
      toast.success('Signup successful!')
      
    }
  }catch(err){
    console.log(err)
    return err.message
  }
}

export default function UserVanRent(){
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
  React.useEffect(()=>{
    setLoggedIn("User") //fixes the component and bad state error
    localStorage.setItem("loginType", "user")
  },[])
  const [date, setDate] = React.useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })
  //useed to get deferred data
  const dataPromise = useLoaderData()

  //handle any changes made to the range picker
  const handleChange = (ranges)=>{
    setDate(ranges.selection)
    
  }

  //submit the request form
  const submitForm = async (e, requestedVan)=>{
    e.preventDefault()

    console.log(requestedVan.hostId)
    const requestDescription = document.getElementById("requestDesciption").value
    const formData = new FormData()
    formData.append('requestObjectId', uuid.v4())
    formData.append('vanHostId', requestedVan.hostId)
    formData.append('requestedVanId', requestedVan._id)
    formData.append('description', requestDescription)
    //get the selected dates and turn into an array of Date objects might not need this format(MM-DD-YYYY)
    //const formatedStartDate = moment(date.startDate).format("MM-DD-YYYY")
    //const formatedEndDate = moment(date.endDate).format("MM-DD-YYYY")
    //console.log(new Date( moment(date.startDate).format("MM-DD-YYYY")))
    const start = date.startDate
    const end = date.endDate
    const requestedDateArray = []
    for(let date= start; date <= end ; date.setDate((date.getDate()+1))){
      requestedDateArray.push(moment(date).format("MM-DD-YYYY"))
    }
    formData.append('requestedDateArray', JSON.stringify(requestedDateArray))

    try{
      //make a request to server endpoint through the api file
      const data = await uploadUserRequest(formData)
      if(data.error){
        toast.error(data.error)
      } else {
        toast.success("Request has been submitted")
      }
    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }


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
          
          <form onSubmit={(e)=>{submitForm(e,userVan)}} encType='multipart/form-data' className="user-van-rent-form">
          
            <div className="user-van-date-container">
            <h2>Please select rent dates</h2>
              <DateRange
                ranges={[date]}
                onChange={handleChange}
                minDate={new Date()}
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                
              />
            </div>

            <div className="user-van-textarea-container">
              <h2>Additional information for the Host (optional)</h2>
              <textarea id="requestDesciption" className="user-van-textarea" placeholder="Please provide any information that may be helpful for the Host to determine your request." required />
              <button  type="submit" className="rent-button" disabled={navigation.state === "submitting"} >
                {navigation.state=== "submitting" ? "Sending Request..." : "Send Request"}
            </button>
            
            </div>

        </form>

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


/* 
<div>
              <label htmlFor="startDate">Start Date: </label>
              <input name="startDate" id="startDate" type="date" required/>
            </div>
            <div>
              <label htmlFor="endDate">End Date: </label>
              <input name="endDate" id="endDate" type="date" required/>
            </div>

*/