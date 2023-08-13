
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
  const dataPromise = await res.json() //this is for defered data
  console.log(dataPromise)
  return dataPromise
}

//Fix this when ready
export async function getHostVans(hostId){
  
  const url = "http://localhost:5050/host/vans"
  const res = await fetch(url, { 
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      }, 
      credentials: "same-origin",
      body: JSON.stringify({}) //change this <---- issue right here
    }
  )
  console.log(res)
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const dataPromise = await res.json()
  console.log(dataPromise)
  return dataPromise.vans
}

export async function signUpUser(newUser){
  //This part is important, line by line 
  //This sends a request from the client side to server side endpoint, then it is recieved in signUp.mjs file
  const res = await fetch("http://localhost:5050/signup",{
    method:"POST", 
    headers:{
      "Content-Type" : "application/json"
    },
    credentials: "same-origin",
    body: JSON.stringify(newUser)}
  )
  const data = await res.json() //get the promised data
  return data
}

export async function loginUser(creds) {
  const res = await fetch("http://localhost:5050/login", { 
    method: "POST",
    headers:{
      "Content-Type" : "application/json"
    }, 
    credentials: "include", //this allows cookies to be sent over
    body: JSON.stringify(creds) }
  )
  const data = await res.json()
  return data
}