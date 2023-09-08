import React from "react"
import {useLoaderData,Await, defer,Link,Form} from "react-router-dom"
import { requireAuth } from "../../utils"
import { LoginContext } from "../..";
import { getUserVan } from "../../../server/api"

import {DateRange} from  'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'

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
  const dataPromise = useLoaderData()
  console.log(date)

  const handleChange = (ranges)=>{
    setDate(ranges.selection)
    
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(e)
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

        </section>

        <form method="post" className="user-van-rent-form">
          
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
            <textarea className="user-van-textarea" />
            <button onSubmit={handleSubmit}>Send Request</button>
          </div>

        
          
    

        </form>
        

        

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