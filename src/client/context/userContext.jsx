import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

//provides the passing of user State to pass down from top to bottom
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
      }).then((res)=>{ 
        console.log(res)
        return res.json()
      }).then((data)=>{
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
