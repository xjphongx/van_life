import React from "react";
import {Form,Link, redirect, useActionData} from "react-router-dom"
import {FaShuttleVan} from "react-icons/Fa"
import { signUpUser } from "../../server/api";
import {toast, Toaster } from "react-hot-toast";


export function loader(){

}

//once the form is submitted as a POST request
export async function action({request}){
  //console.log(request)
  const formData = await request.formData()
  const newUserObject = {
    firstName:formData.get("firstName"),
    lastName:formData.get("lastName"),
    email: formData.get("email"),
    confirmEmail: formData.get("confirmEmail"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    dateOfBirth: formData.get("dateOfBirth"),
    phone: formData.get("phoneNumber")
  }

  //console.log(newUserObject)
  
  //make the call to the POST method
  try{
    const data = await signUpUser(newUserObject)
    console.log(data)
    //if there is an error in the backend
    if(data.error){
      toast.error(data.error)
    }else {
      toast.success('Signup successful!')
      redirect('/login')
    }
  }catch(err){
    console.log(err)
    return err.message
  }
  
  
}

export default function SignUp(){
  const errorMessage = useActionData()


  return(
    <div className="signup-container">
      <div className="signup-header">
        <h1>Sign up for a free account ... </h1>
        <FaShuttleVan className="signup-van" size={30}/>
      </div>
      {errorMessage && <h2>{errorMessage}</h2>}
      <Toaster position='top-center' toastOptions={{duration: 2000}}/>
      <Form method="post" className="signup-form" >
        <div className="name-container">
          <input name="firstName" type="name" placeholder="First Name" required/>
          <input name="lastName" type="name" placeholder="Last Name" required/>
        </div>

        <div className="email-container">
          <input name="email" type="email" placeholder="Email Address" required/>
          <input name="confirmEmail" type="email" placeholder="Confirm Email Address" required/>
        </div>

        <div className="password-container">
          <input name="password" type="password" placeholder="Password" required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" required/>
        </div>

        <div className="info-container">
          <input name="dateOfBirth" type="date" id="date" className="date-form" required/>
          <input name="phoneNumber" type="tel" placeholder="Telephone Number(Optional)"/>
        </div>
        
        <p className="signup-terms">
          By clicking Sign up, you agree to our Terms. Learn how we collect, 
          use and share your data in our Data Policy and how we use cookies and 
          similar technology in our Cookies Policy. You may recieve SMS Notifications 
          from us and can opt out any time.
        </p>
        
        <button disabled={navigation.state === "submitting"} >
          {navigation.state=== "submitting" ? "Creating account..." : "Sign up"}
        </button>
      </Form>
      <div>
        <p>Already have an account? <Link to='../login' className="signup-login-button">Login in</Link> here.</p>
      </div>
    </div>
  )
}