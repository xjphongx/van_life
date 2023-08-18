import {useContext} from "react";
import { UserContext } from "../../context/userContext";

export default function Dashboard(){
  const {user} = useContext(UserContext)// get the user from context
  console.log(user)
  return (
    <>
      <h1>dashboard</h1>
      {!!user && <h2> Hi {user.firstName}</h2>}
    </>
  )
}