import React from "react";

export default function Footer() {
  const styles = {
    backgroundColor: '#252525',
    color:'#AAAAAA',
    paddingTop:25,
    paddingBottom:25,
    paddingLeft:70,
    paddingRight:70,
    textAlign: 'center',
    fontFamily: 'Inter', 
  }
  return(
      <footer style={styles} > Copyright 2022 #VANLIFE</footer>
  )
}