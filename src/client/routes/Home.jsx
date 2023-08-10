import React from "react";
import {Link} from "react-router-dom"


export default function Home(){
  return(
    <>
      <main className='main-container'>
        <div className='content-container'>
          <h1>You got the travel plans, we got the travel vans.</h1>
          <h3>Add adventure to your life by joinging the #vanlife movment. &#10; Rent the perfect van to make your perfect road trip.</h3>
          <Link to='/vans' className='find-van-button'>Find your van</Link>
        </div>
      </main> 
      
    </>
  )
}