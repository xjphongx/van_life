import React from "react";
import { Link, useLocation,Form } from "react-router-dom";

export async function action(){
  console.log("action upload")
}

export default function HostVanUpload(){
  const [images, setImages] = React.useState({files:[]}) //FileList
  const [imagePreview, setImagePreview] = React.useState()
  const location = useLocation()
  //console.log(location)
  const search = location.state? location.state.search : ""

  console.log(images)

  React.useEffect(()=>{
    if(images.files.length!==0){//if files array is populated meaning there is a file
      const file = images.files[0]
      const reader = new FileReader();
      reader.onload = () =>{
        console.log(reader.result)
        setImagePreview(reader.result)//returns as a base64 string 
      }
      reader.readAsDataURL(file)
    } else{
      setImagePreview(null)
    }
  }, [images.files]) //make sure to add object prop as dependency





  const addImage = (e) => {
    e.preventDefault()
    console.log(e)
    const fileList = e.target.files
    console.log(fileList)
  
    //save the file into the file array
    setImages((prevState)=>{
      const newFileObj = {files:[...prevState.files]}
      newFileObj.files.unshift(fileList[0])//added to beginning of array
      //console.log(newObj)
      return newFileObj
    })
  }


  return(
    <div className="host-van-form-container">
      <div className='detail-back-container'>
        <p className='arrow'> &larr; </p>
        <Link to={`..${search}`} relative="path" className='detail-back-button'>Back to Host Vans</Link>
      </div>
      <div className="host-van-upload-content-container">
        <div className="host-van-upload-image-preview-container">
          {imagePreview ? <img className="upload-preview" src={imagePreview}/>
          :<div className="host-van-upload-image-preview">Image Preview goes here.</div>
          }  
          
        
        </div>
        <Form method="post" className="host-van-upload-form">
        <label htmlFor="vanName" className="host-label" >Van Name: </label>
        <input id="vanName" name="name" type="name" placeholder = "Example: The Red" required/>
      
        <label htmlFor="vanDescription" className="host-label">Van Description: </label>
        <textarea id="vanDescription" name="description" rows="6" cols="50" placeholder="Your Van Description"/>
   
        <label className="host-label">Type of Van: </label>
        <div className="host-van-type-radio-group">
          <div>
            <input name="type" id="vanChoice1" type="radio" value="Simple" required/>
            <label htmlFor="vanChoice1">Simple</label>
          </div>
          <div>
            <input name="type" id="vanChoice2" type="radio" value="Luxury"/>
            <label htmlFor="vanChoice2">Luxury</label>
          </div>
          <div>
            <input name="type" id="vanChoice3" type="radio" value="Rugged"/>
            <label htmlFor="vanChoice3">Rugged</label>
          </div>
        </div>{/* End of radio group */}

        <label htmlFor="vanPrice" className="host-label">Price per day ($USD): </label>
        <input id="vanPrice" name="price" type="price" placeholder = "Example: $100" required/>

        <label htmlFor="vanImage" className="host-label">Van Image File: </label>
        <input id="vanImage" name="imageUrl" type="file" accept="image/*" onChange={(e)=>{addImage(e)}} multiple required/>

        <br></br>{/* skips a slot */}
        <div className='host-van-upload-button-container'>
          <button className="host-van-upload-button" disabled={navigation.state === "submitting"} >
            {navigation.state=== "submitting" ? "Uploading to Database..." : "Upload Van"}
          </button>
        </div>
        
      </Form>
      </div>
    </div>
  )
}