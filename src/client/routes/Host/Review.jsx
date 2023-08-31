import React from "react";
import {Link, useSearchParams, useLoaderData, defer,Await} from "react-router-dom"
import { getReviewScore, requireAuth } from "../../utils";
import { getHostReviews } from "../../../server/api";
import {AiFillStar,AiOutlineStar} from "react-icons/ai"
import * as uuid from "uuid"
import ProgressBar from "../../components/ProgessBar";


export async function loader({request}){
  const user = await requireAuth(request)
  return defer({hostVansWithReviews:getHostReviews()})
}


export default function Review(){
  const dataPromise = useLoaderData()
 
  const renderReviewElements = (hostVansWithReviews) => {
    let hostReviewArray = [] //an array to contain all of Host's Reviews
    hostVansWithReviews.map((van)=>{
      hostReviewArray = hostReviewArray.concat(van.reviews)
    })

    //render the review elements by mapping through the host's review array, if there are 3 reviews then render 3 review elements
    const reviewsElements = hostReviewArray.map((review)=>{
      //Below is a RenderStars component to display the stars logically
      function RenderStars({star}){
        const starsArray = []
        for(let i =0; i < 5;i++){
          if(i<star){
            //populate the stars array
            starsArray.push(1)
          }else{
            starsArray.push(0)//empty star
          }
        }

        const renderStarElements = starsArray.map((ele)=>{
          return(
            <div key={uuid.v4()}>
              {ele===1 ? 
                <AiFillStar size={25} className="host-review-gold-star"/>
                :<AiOutlineStar size={25} className="host-review-empty-star"/>
              }
            </div>     
          )
        })

        //This is being returned to <RenderStars/>
        return(
          <div className="host-review-star-container">
            {renderStarElements}
          </div>
        )
      }//end of RenderStars Component
      
      console.log(review)
      return(
          <div key={review.id} className="host-review-tile">
              <RenderStars star={review.star}/>
              <h4 className="host-review-poster">{review.name}   <span>December 1, 2022</span></h4>
              <p className="host-review-description">
              {review.description}
              </p>
          </div>
      )
    })//end of reviewsElements 

    
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
    let starAverage = getReviewScore(hostVansWithReviews)

    return(
        <div className="host-review-list-container">
           <h1>Your reviews</h1>
          <div  className="host-review-stats-container">
            <h1>{starAverage}<span><AiFillStar size={25} className="host-review-gold-star"/>overall rating</span></h1>
            <div className="host-review-stats-bar-container">
                <ProgressBar starType={5} totalReviews={hostReviewArray.length} totalStars={fiveStars} />
                <ProgressBar starType={4} totalReviews={hostReviewArray.length} totalStars={fourStars} />
                <ProgressBar starType={3} totalReviews={hostReviewArray.length} totalStars={threeStars} />
                <ProgressBar starType={2} totalReviews={hostReviewArray.length} totalStars={twoStars} />
                <ProgressBar starType={1} totalReviews={hostReviewArray.length} totalStars={oneStars} />
            </div>
          </div>

          <h3>Reviews ({hostReviewArray.length})</h3>
          
          <div className="host-review-tile-container">
            {reviewsElements} 
          </div>
          
        </div>

    )
  }
  
  return (
    <>
      <div className="host-review-container">
        <React.Suspense fallback={<h1>Loading Reviews...</h1>}>
          <Await resolve={dataPromise.hostVansWithReviews}>
              {renderReviewElements}{/* render the review element containers */}
          </Await>
        </React.Suspense>
    </div>
    </>
  )
}