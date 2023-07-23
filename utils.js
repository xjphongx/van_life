import { redirect } from "react-router-dom"
/*
  Added an async to this function to act like a database call and we want 
  to make a promise for the data and get it before the component renders    */
export async function requireAuth() { 
  const isLoggedIn = true
  if(!isLoggedIn){
    throw redirect(`/login${isLoggedIn ? "" : "?message=You must log in first." }`)
  }
}