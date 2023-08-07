//overload the function: this may get an id or not
export async function getVans(id){
  const url = id? `http://localhost:5050/vans/${id}`:`http://localhost:5050/vans`
  const res = await fetch(url)
  console.log(res)
  if(!res.ok){
    throw{
      //throw an error if response is NOT ok 
      message: "failed to fetch vans",
      statusText: res.statusText,
      status:res.status
    }
  }
  //turn the response into json
  const dataPromise = await res.json()
  console.log(dataPromise)
  return dataPromise
}


export async function getHostVans(id){
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
  const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function signUpUser(creds){
  //This part is important, line by line 
  const res = await fetch("http://localhost:5050/users",{
    method:"POST", 
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(creds)}
  )

  if(!res.ok){
    throw{
      //throw an error if response is NOT ok 
      message: "failed to fetch users",
      statusText: res.statusText,
      status:res.status
    }
  }
  const dataPromise = await res.json()
  return dataPromise
}



export async function loginUser(creds) {
  console.log(creds)
  const res = await fetch("http://localhost:5050/users",
      { method: "post", body: JSON.stringify(creds) }
  )
  console.log(res)
  const data = await res.json()
  console.log(data)
  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}