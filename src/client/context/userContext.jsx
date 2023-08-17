import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export default function UserContextProvider({children}){
  const [user, setUser] = useState(null)
  useEffect(()=>{
    if(!user){
      //run a fetch request to an end point when the page loads
      fetch("http://localhost:5050/host/profile",{
        headers:{
          "Content-Type" : "application/json"
        }, 
        credentials: "include"
      }).then(({data})=>{
      console.log(data)  
      setUser(data)
      })
    }
  },[])

  /* send user state down  */
  return(
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  )
}
