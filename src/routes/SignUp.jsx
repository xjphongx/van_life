import React from "react";
import {Form} from "react-router-dom"
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
      <h1>Sign up for a free account ... <FaShuttleVan className="signup-van"/> </h1>
      
      <Form method="post" className="signup-form" >
        <div>
          <input
          name="firstName"
          type="name"
          placeholder="First Name"
          />
          <input
          name="lastName"
          type="name"
          placeholder="Last Name"
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
        />
        <input
        name="password"
        type="password"
        placeholder="Password"
        />
        <input
          name="dateOfBirth"
          type="date"
          placeholder="Date of Birth MM/DD/YEAR"
        />
        <input
        name="phoneNumber"
        type="tel"
        placeholder="Telephone Number"
        />
        
        <button disabled={navigation.state === "submitting"} >
          {navigation.state=== "submitting" ? "Loggin in..." : "Log in"}
        </button>
      </Form>
    </div>
  )
}