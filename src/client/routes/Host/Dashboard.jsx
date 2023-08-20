
import { requireAuth } from "../../utils";

export async function loader({request}){
  const user = await requireAuth(request)
  console.log(user)
}

export default function Dashboard(){
  /* const contextData = useContext()
  console.log(contextData) */
  return (
    <>
      <h1>dashboard</h1>

    </>
  )
}