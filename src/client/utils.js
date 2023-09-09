import { redirect } from "react-router-dom"

/*
  Added an async to this function to act like a database call and we want 
  to make a promise for the data and get it before the component renders    */
export  async function requireAuth(request) { 
  //console.log(request)
  const url = new URL(request.url)
  const pathname = url.pathname //when logged out, and clicks a protected route, it will save the pathname and get the user to relog in
  const isLoggedIn = localStorage.getItem("loggedIn")
  const loginType = localStorage.getItem("loginType")
  //console.log(pathname)
  const pathNameArray = pathname.split("/")
  //console.log(pathNameArray)
  if(!isLoggedIn){
    //UI feature where the user may go back to their last tab
    throw redirect(
      `/login`
    )
    //`/login?message=you must log in first.&redirectTo=${pathname}`
  }
  
  try{
    const response = await fetch(`http://localhost:5050/${loginType}/profile`,{
      headers:{
        "Content-Type" : "application/json"
      }, 
      credentials: "include"
    })
    const data = await response.json()
    return data
  }catch(err){
    throw err
  }

}

export function getReviewScore(hostVansWithReviews){
  
  let hostReviewArray = []
  hostVansWithReviews.map((van)=>{
    hostReviewArray = hostReviewArray.concat(van.reviews)
  })

  //Calculate the Star distribution here because I cant update state when rendering
  let fiveStars=0
  let fourStars=0
  let threeStars=0
  let twoStars=0
  let oneStars=0
  
  hostReviewArray.map(review=>{
    if(review.star===5){
      fiveStars += 1
    } else if (review.star === 4){
      fourStars+=1
    } else if (review.star === 3){
      threeStars+=1
    } else if (review.star === 2){
      twoStars+=1
    } else  {
      oneStars+=1
    }
  })
  let totalStars = fiveStars*5+fourStars*4+threeStars*3+twoStars*2+oneStars
  let totalPossibleStars = hostReviewArray.length
  let starAverage = Math.round((totalStars/totalPossibleStars) * 10) / 10
  
  
  
  return starAverage
}