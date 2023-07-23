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

  const [loginFormData, setLoginFormData] = React.useState({email:"",password:""})

  function handleSubmit(e){
    e.preventDefault()

    console.log(loginFormData)
    loginUser(loginFormData) //returns a promise of the matched data if the credentials are found and correct
      .then(data => console.log(data))
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
        <button>Log in</button>
      </form>
      
    </div>
  )




}

