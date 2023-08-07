import React from "react";
import {Form,Link} from "react-router-dom"
import {FaShuttleVan} from "react-icons/Fa"
import { signUpUser } from "../server/api";




export function loader(){

}

//once the form is submitted as a POST request
export async function action({request}){
  console.log(request)
  const formData = await request.formData()
  const newUserObject = {
    firstName:formData.get("firstName"),
    lastName:formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    dateOfBirth: formData.get("dateOfBirth"),
    phone: formData.get("phoneNumber")
  }

  console.log(newUserObject)
  
  //make the call to the POST method
  try{
    const data = await signUpUser(newUserObject)
  }catch(err){
    console.log(err)
    return err.message
  }
  
  
}

export default function SignUp(){


  return(
    <div className="signup-container">
      <div>
        <h1>Sign up for a free account ... </h1>
        <FaShuttleVan className="signup-van" size={30}/>
      </div>
      
      <Form method="post" className="signup-form" >
        <div className="name-container">
          <input name="firstName" type="name" placeholder="First Name"/>
          <input name="lastName" type="name" placeholder="Last Name"/>
        </div>

        <div className="email-container">
          <input name="email" type="email" placeholder="Email Address"/>
          <input name="confirmEmail" type="email" placeholder="Confirm Email Address"/>
        </div>

        <div className="password-container">
          <input name="password" type="password" placeholder="Password" />
          <input name="confirmPassword" type="password" placeholder="Confirm Password"/>
        </div>

        <div className="info-container">
          <input name="dateOfBirth" type="date" id="date" className="date-form"/>
          <input name="phoneNumber" type="tel" placeholder="Telephone Number"/>
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