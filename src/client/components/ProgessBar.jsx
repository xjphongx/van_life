import {useState}from "react"

export default function ProgressBar(props){
  let percent = Math.round((props.totalStars / props.totalReviews )*100)
  return(
    <div className="host-review-progess-bar-container">
      <h4>{props.starType} Stars</h4>
      <div className="back-progess-bar" style={{
        height:"12px",
        width:"100%",
        backgroundColor:"lightgrey",
        borderRadius:"10px"

      }}>
        <div className="front-progess-bar" style={{
          height:"100%",
          width:`${percent}%`,
          backgroundColor:"goldenrod",
          borderRadius:"10px"

        }}>
        </div>
      </div>
      <h4>{percent}%</h4>
    </div>
    
  )
}