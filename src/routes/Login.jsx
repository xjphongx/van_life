import React from "react";
import { useNavigate,useLoaderData } from "react-router-dom";

import { loginUser } from "../../api";

export function loader({request}){
  console.log(request)
  const url = new URL(request.url)
  const params = url.searchParams
  console.log(params)
  console.log(params.get("message"))
  return params.get("message")
}

export default function Login(){
  //use loaderData to get the return message of loader function
  const message = useLoaderData()

  //useNavigate is the same as <Navigate/>
  const navigate = useNavigate()

  //status state
  const [status, setStatus] = React.useState("idle")

  //error state
  const [error, setError] = React.useState(null)

  
  const [loginFormData, setLoginFormData] = React.useState({email:"",password:""})

  function handleSubmit(e){
    e.preventDefault()
    //set the status when submitting
    setStatus("submitting")
    setError(null)
    console.log(loginFormData)
    loginUser(loginFormData) //returns a promise of the matched data if the credentials are found and correct
      .then(data => {
        navigate("/host", {replace: true}) //replaces the entry in the history stack
      })
      .catch(err=> setError(err)) //catch if there is an error when loading data
      .finally(()=>setStatus("idle"))//set the status to idle when promise is done

  }


  
  function handleChange(e){
    const {name,value} = e.target;
    setLoginFormData((prevState)=>{
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  return(
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h2>{message}</h2>}
      {error && <h2>{error.message}</h2>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"} >
          {status=== "submitting" ? "Loggin in..." : "Log in"}
        </button>
      </form>
      
    </div>
  )




}

