import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage(){
  return(
    <section className="not-found-container">
      <h1>Sorry, the page you were looking for was not found.</h1>
      <Link to=".." relative="path" className="not-found-return-link">Return to Home</Link>
    </section>
  )
}