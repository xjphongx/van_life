
















/* Create a separate file to handle fetch request and export and import to desired file */
//overload the function: this may get an id or not
export async function getVans(id){
  const url = id ? `/api/vans/${id}` : "/api/vans"
  const res = await fetch(url)

  console.log(res)
  //check if fetch request has an error
  if(!res.ok){ //NOTE: change this to !res.ok
    throw{
      //throw an error if response is NOT ok 
      message: "failed to fetch vans",
      statusText: res.statusText,
      status:res.status
    }
  }
  const data = await res.json()
  console.log(data)
  return data.vans
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

export async function loginUser(creds) {
  const res = await fetch("/api/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }

  return data
}