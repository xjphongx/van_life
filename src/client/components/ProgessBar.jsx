import {useState}from "react"

export default function ProgressBar(props){
  console.log(props)
  let percent = (props.totalStars / props.totalReviews )*100
  console.log(percent)

  return(
    <div className="host-review-progess-bar-container">
      <h4>{props.starType}</h4>
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