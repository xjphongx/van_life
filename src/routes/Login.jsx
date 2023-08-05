import React from "react";
import { useNavigate,useNavigation,useLoaderData,Form, redirect, useActionData, Link } from "react-router-dom";

import { loginUser } from "../server/api";

export function loader({request}){
  //console.log(request)
  const url = new URL(request.url)
  const params = url.searchParams
  //console.log(params)
  //console.log(params.get("message"))
  return params.get("message")
}


//This is needed for the Form component
export async function action({request}){
  console.log(request)
  const formData = await request.formData()
  const email = formData.get("email") // get the name of the input
  const password = formData.get("password")
  //CONCEPT: a way to get the url when traversing thru protected routes and logging out 
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host" //get the search params in url

  try{ //Error handling
    const data = await loginUser({email,password})// user logs in here
    //console.log(data) 
    localStorage.setItem("loggedin", true)//sets the loggedin state to true
    //console.log(localStorage.getItem("loggedin"))
    
    return redirect(pathname) //once email and password matches, redirect to host page
  } catch(err){
    console.log(err)
    return err.message
  }

}


export default function Login(){
  //use loaderData to get the return message of loader function
  const message = useLoaderData()

  //useNavigate is the same as <Navigate/>
  //const navigate = useNavigate()

  //useNavigation state for idle loading submitting
  const navigation = useNavigation()
  //console.log(navigation)

  //error handling
  const errorMessage = useActionData()
  
  return(
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h2>{message}</h2>}
      {errorMessage && <h2>{errorMessage}</h2>}
      <Form method="post" className="login-form" replace={true}>
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
        <button disabled={navigation.state === "submitting"} >
          {navigation.state=== "submitting" ? "Loggin in..." : "Log in"}
        </button>
      </Form>
      {/* Sign up option below here */}
      <div>
        <p>Don't have an account? <Link to='../signup' className="login-sign-up-button">Sign up</Link> here.</p>
      </div>
    </div>
  )




}
