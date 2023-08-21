import React from "react";
import { Link, useLocation,Form } from "react-router-dom";

export default function HostVanUpload(){
  const location = useLocation()
  console.log(location)
  const search = location.state? loaction.state.search : ""
  return(
    <div className="host-van-form-container">
      <div className='detail-back-container'>
        <p className='arrow'> &larr; </p>
        <Link to={`..${search}`} relative="path" className='detail-back-button'>Back to Host Vans</Link>
      </div>
      <Form method="post" className="host-van-upload-form">
        <label for="vanName" className="host-label" >Van Name: </label>
        <input id="vanName" name="name" type="name" placeholder = "Example: The Red" required/>
      
        <label for="vanDescription" className="host-label">Van Description: </label>
        <textarea id="vanDescription" name="description" rows="6" cols="50" placeholder="Your Van Description"/>
   
        <label className="host-label">Type of Van: </label>
        <div className="host-van-type-radio-group">
          <div>
            <input name="type" id="vanChoice1" type="radio" value="Simple" required/>
            <label for="vanChoice1">Simple</label>
          </div>
          <div>
            <input name="type" id="vanChoice2" type="radio" value="Luxury"/>
            <label for="vanChoice2">Luxury</label>
          </div>
          <div>
            <input name="type" id="vanChoice3" type="radio" value="Rugged"/>
            <label for="vanChoice3">Rugged</label>
          </div>
        </div>{/* End of radio group */}

        <label for="vanPrice" className="host-label">Price per day ($USD): </label>
        <input id="vanPrice" name="price" type="price" placeholder = "Example: $100" required/>

        <label for="vanImage" className="host-label">Van Image File: </label>
        <input id="vanImage" name="imageUrl" type="file" multiple required/>
        
        <br></br>{/* skips a slot */}
        <div className='host-van-upload-button-container'>
          <button className="host-van-upload-button" disabled={navigation.state === "submitting"} >
            {navigation.state=== "submitting" ? "Uploading to Database..." : "Upload Van"}
          </button>
        </div>
        
      </Form>
    </div>
  )
}