import React from "react";
import * as uuid from  "uuid"
import { Link, useLocation,Form} from "react-router-dom";

export async function action({request}){
  console.log(request)
  console.log("action upload")
  const formData = await request.formData()
  const newVanObject = {
    name:formData.get("name"),
    description:formData.get("description"),
    type:formData.get("type"),
    licensePlate:formData.get("licensePlate"),
    price:formData.get("price"),
    imageUrl:formData.get("imageUrl")
  }
  console.log(newVanObject)
  
}

export default function HostVanUpload(){
  const [images, setImages] = React.useState({files:[]}) //FileList
  const [image, setImage] = React.useState(null)
  const [imagePreview, setImagePreview] = React.useState()
  const [imagePreviewArray, setImagePreviewArray] = React.useState([])//upload this to object
  const location = useLocation()
  const search = location.state? location.state.search : ""

  //Run this useEffect when the user uploads new files from device
  React.useEffect(()=>{
    //when the image from the input changes, update the imagepreview
    if(image){
      const reader = new FileReader();
      reader.onload= () =>{
        setImagePreview(reader.result)//returns as a base64 string 
      }
      reader.readAsDataURL(image[0])
      
    }
    else{
      setImagePreview(null) //run this when there are no images
    }
  },[image])

  //Run this useEffect when the user inputs clicks the upload button 
  React.useEffect(()=>{
    if(images.files.length!==0){//if files array is populated meaning there is a file
      const fileList = images.files[0]
      let filesArray = Array.prototype.slice.call(fileList)//Allows the FileList to become an array
      const tempArray = [...imagePreviewArray]
      filesArray.map((file)=>{
        let reader = new FileReader();
        reader.onload = () => {//run this when reader.readasdataurl is loading
          tempArray.push(reader.result)
          setImagePreviewArray(tempArray)
        }
        reader.readAsDataURL(file)
      })
    } else{
      setImagePreview(null)
      setImagePreviewArray([])
    }
  }, [images.files]) //make sure to add object prop as dependency


  //when Choosing files, add them to the fileList
  const addImage = (e) => {
    console.log(e)
    //console.log(e.target.files)
    e.preventDefault()
    const fileList = e.target.files
    setImage(fileList)
  }

  //upon clicking the upload pictures button, upload the images and save to image preview array
  const uploadImage = (e) =>{
    //save the file into the file array
    setImages((prevState)=>{
      const newFileObj = {files:[...prevState.files]}
      //check if image is an array or not
      if(image.length > 1){//is an array
        newFileObj.files.unshift(image)
      }else{
        newFileObj.files.unshift(image)//added to beginning of array
      }
      return newFileObj
    })
    setImage(null)//resets the image
  }

  //updates the image preview with the event's target
  function updateImagePreview(e){
    setImagePreview(e.target.src)
  }
  
  //Submit Form
  function submitForm(e){
    e.preventDefault()
    console.log(e)
    console.log(imagePreviewArray)
    //Getting host van's input data
    const vanName = document.getElementById("vanName").value
    const vanDescription = document.getElementById("vanDescription").value
    const vanTypeArray = document.getElementsByName("vanType")
    let vanType;
    for(let i = 0; i < vanTypeArray.length; i++){
      if(vanTypeArray[i].checked){
        vanType = vanTypeArray[i].value
      }
    }
    const vanPlate = document.getElementById("vanPlate").value
    const vanPrice = document.getElementById("vanPrice").value

    //appending to host van's input data into formdata
    const formData = new FormData()
    formData.append("name",vanName)
    formData.append("description",vanDescription)
    formData.append("type",vanType)
    formData.append("licensePlate",vanPlate)
    formData.append("price",vanPrice)
    formData.append("imageUrl",imagePreviewArray)
    
  }

  //renders the preview element array on the page
  const renderImagePreviewElements = imagePreviewArray.map((image)=>{
      //console.log(image)
      return(
        <div key={uuid.v4()}>
          <img className="array-upload-preview-element" onClick={(e)=>{updateImagePreview(e)}} src={image}/>
        </div>
      )
    })
  
  return(
    <div className="host-van-form-container">
      <div className='detail-back-container'>
        <p className='arrow'> &larr; </p>
        <Link to={`..${search}`} relative="path" className='detail-back-button'>Back to Host Vans</Link>
      </div>

      <h1 className='upload-header'>Uploading a New Van</h1>

      <div className="host-van-upload-content-container">
        <div className="host-van-upload-image-preview-container">
          <div className="host-van-upload-preview-container">
            {imagePreview ? <img className="upload-preview" src={imagePreview}/>
              :<div className="host-van-upload-image-preview">Image Preview goes here.</div>
            } 
          </div>
          <div className="host-van-upload-image-scroller snaps-inline">
            {renderImagePreviewElements}
          </div>
        </div>

        <form onSubmit={(e)=>{submitForm(e)}} encType='multipart/form-data' className="host-van-upload-form">
          <label htmlFor="vanName" className="host-label" >Van Name: </label>
          <input className="upload-input" id="vanName" name="name" type="name" placeholder = "Example: The Red" required/>
        
          <label htmlFor="vanDescription" className="host-label">Van Description: </label>
          <textarea id="vanDescription" name="description" rows="6" cols="50" placeholder="Your Van Description"/>
    
          <label className="host-label">Type of Van: </label>
          <div className="host-van-type-radio-group">
            <div>
              <input name="vanType" id="vanChoice1" type="radio" value="Simple"/>
              <label htmlFor="vanChoice1">Simple</label>
            </div>
            <div>
              <input name="vanType" id="vanChoice2" type="radio" value="Luxury"/>
              <label htmlFor="vanChoice2">Luxury</label>
            </div>
            <div>
              <input name="vanType" id="vanChoice3" type="radio" value="Rugged"/>
              <label htmlFor="vanChoice3">Rugged</label>
            </div>
          </div>{/* End of radio group */}
            
          <label htmlFor="vanPlate" className="host-label">License Plate: </label>
          <input className="upload-input" id="vanPlate" name="licensePlate" type="plate" placeholder = "Example: 6ABC243 " required/>

          <label htmlFor="vanPrice" className="host-label">Price per day ($USD): </label>
          <input className="upload-input" id="vanPrice" name="price" type="price" placeholder = "Example: $100" required/>

          <label htmlFor="vanImage" className="host-label">Van Image: </label>
          <div>
            <input className="host-van-upload-file" id="vanImage" name="imageUrl" type="file" multiple accept="image/*" onChange={(e)=>{addImage(e)}}/>
            {image && <button className="host-van-upload-file-button" type="button" onClick={(e)=>{uploadImage(e)}}>Upload Image</button>}
          </div>
          

          <br></br>{/* skips a slot */}
          <div className='host-van-upload-button-container'>
            <button state={{hello:"hello"}} type="submit" className="host-van-upload-button" disabled={navigation.state === "submitting"} >
              {navigation.state=== "submitting" ? "Uploading to Database..." : "Upload Van"}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}
