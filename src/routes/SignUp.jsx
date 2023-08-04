import React from "react";
import {Form} from "react-router-dom"
import {FaShuttleVan} from "react-icons/Fa"

export function loader(){

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