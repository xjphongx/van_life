import { redirect } from "react-router-dom"
/*
  Added an async to this function to act like a database call and we want 
  to make a promise for the data and get it before the component renders    */
export async function requireAuth(request) { 
  const url = new URL(request.url)
  const pathname = url.pathname //when logged out, and clicks a protected route, it will save the pathname and get the user to relog in
  console.log(url)
  const isLoggedIn = localStorage.getItem("loggedin")
  
  if(!isLoggedIn){
    throw redirect(
      `/login?message=you must log in first.&redirectTo=${pathname}`
    )
  }
}