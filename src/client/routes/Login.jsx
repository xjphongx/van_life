import React from "react";
import { useOutletContext,useLocation,useNavigate,useNavigation,useLoaderData,Form, redirect, useActionData, Link } from "react-router-dom";
import {toast, Toaster } from "react-hot-toast";
import { loginUser } from "../../server/api";
import { LoginContext } from "..";


export function loader({request}){
  const url = new URL(request.url)
  const params = url.searchParams
  /* console.log(params)
  console.log(params.get("message")) */
  return params.get("message")
}


//This is needed for the Form component
export async function action({request}){
  const formData = await request.formData()
  const email = formData.get("email") // get the name of the input
  const password = formData.get("password")
  //CONCEPT: a way to get the url when traversing thru protected routes and logging out 
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host" //get the search params in url
  console.log("sending action requets")
  try{ //Error handling
    const data = await loginUser({email,password})// user logs in here

    if(data.error){
      toast.error(data.error)
      localStorage.setItem("loggedIn", false)
    } else{
      toast.success('Login successful')
      
      //REMOVE THIS WHEN IMPLEMENTING LOG OUT
      localStorage.setItem("loggedIn", true)//sets the loggedin state to true
      //return redirect(pathname)
      return pathname
    }
    //return results of the login
    
  } catch(err){
    console.log(err)
    localStorage.setItem("loggedIn", false)
    toast.error(err.message)
    //return err.message
  }

}


export default function Login(){
  //use loaderData to get the return message of loader function
  const message = useLoaderData()

  //use actionData and useContext to get the loggedIn results based from action function
  const [loggedIn,setLoggedIn] = React.useContext(LoginContext)
  console.log("login: ",loggedIn)
  const pathname = useActionData()
  /* console.log(localStorage.getItem("loggedIn"))
  console.log(pathname) */

   //error handling
  //const {errorMessage} = useActionData()
  //useNavigate is the same as <Navigate/>
  const navigate = useNavigate()

  React.useEffect(()=>{
    console.log("running use effect")
    if(pathname){
      navigate(pathname)
    }
  },[pathname])
 

  //useLocation to get loggedin state
  const location = useLocation()
  //console.log(location)

  

  //useNavigation state for idle loading submitting
  const navigation = useNavigation()
  //console.log(navigation)

 
  




  return(
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h2>asd{message}</h2>}
      {/* {errorMessage && <h2>{errorMessage}</h2>} */}
      <Toaster position='top-center' toastOptions={{duration: 2000}}/>
      <Form method="POST" className="login-form" replace={true}>
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
