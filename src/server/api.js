
//overload the function: this may get an id or not
export async function getVans(id){
  const url = id? `http://localhost:5050/vans/${id}`:`http://localhost:5050/vans`
  
  const res = await fetch(url)
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
  //console.log(dataPromise)
  return dataPromise
  
}

export async function getListHostVans(){
  //use the hostId to then make another request to host vans
  //console.log(hostId)
  const url = `http://localhost:5050/host/vans`
  const res = await fetch(url, { 
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      }, 
      credentials: "include"
    }
  )
  
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const dataPromise = await res.json()
  //console.log(dataPromise)
  return dataPromise
}

/* Used in the host van detail page */
export async function getHostVan(id){
  const url = `http://localhost:5050/host/vans/${id}`
  const res = await fetch(url)
  
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const dataPromise = await res.json()
  //console.log(dataPromise)
  return dataPromise
}

/* Used in the user van detail page */
export async function getUserVan(id){
  //console.log(id)
  const url = `http://localhost:5050/user/vans/${id}`
  const res = await fetch(url)
  
  if (!res.ok) {
      throw {
          message: "Failed to fetch vans",
          statusText: res.statusText,
          status: res.status
      }
  }
  const dataPromise = await res.json()
  //console.log(dataPromise)
  return dataPromise
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
    body: JSON.stringify(newUser)
  })
  
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
    body: JSON.stringify(creds) 
    }
  )
  if (!res.ok) {
    throw {
        message: "Failed to fetch user credentials",
        statusText: res.statusText,
        status: res.status
    }
  }
  
  const data = await res.json()
  //console.log(data)
  return data
}

export async function logOut(){
  const res = await fetch("http://localhost:5050/logout", { 
    method: "GET",
    headers:{
      "Content-Type" : "application/json"
    }, 
    credentials: "include" //this allows cookies to be sent over
  
    } )
  if (!res.ok) {
    throw {
        message: "Failed log out of server",
        statusText: res.statusText,
        status: res.status
    }
  }
  const data = await res.json()
  //console.log(data)
  return data
}

export async function getHostDashboardInfo(hostId){
  /* console.log(hostId) */
  const url1 = `http://localhost:5050/users/${hostId}`
  const res1 = await fetch(url1, { 
      method: "GET",
      headers:{
        "Content-Type" : "application/json"
      }, 
      credentials: "include",
      /* body: JSON.stringify(hostId) */
    }
  )
  if (!res1.ok) {
    throw {
        message: "Failed to fetch hostInfo",
        statusText: res1.statusText,
        status: res1.status
    }
  }
  const hostUser = await res1.json()
  const url2 = `http://localhost:5050/host/vans`
  const res2 = await fetch(url2, { 
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      }, 
      credentials: "include",
      /* body: JSON.stringify(hostId) */
    }
  )
  if (!res2.ok) {
    throw {
        message: "Failed to fetch hostInfo",
        statusText: res2.statusText,
        status: res2.status
    }
  }
  const hostUserVans = await res2.json()
  
  //get host requests
  const url3 = `http://localhost:5050/requests/host/${hostId}`
  const res3 = await fetch(url3)
  if (!res3.ok) {
    throw {
        message: "Failed to fetch hostInfo",
        statusText: res3.statusText,
        status: res3.status
    }
  }
  const hostUserRequests = await res3.json()

  const combinedDataPromise = {hostUser,hostUserVans,hostUserRequests}
  /* console.log(combinedDataPromise) */
  return combinedDataPromise
}

export async function uploadHostVan(formData){
  const result = Object.fromEntries(formData)//changes formData object to a JSON stringifyable object
  const res = await fetch("http://localhost:5050/host/vans/upload", {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    credentials: "include", //this allows cookies to be sent over
    body: JSON.stringify(result)
  })

  if (!res.ok) {
    throw {
        message: "Failed to upload the van",
        statusText: res.statusText,
        status: res.status
    }
}
  const data = await res.json() //get the promised data
  return data
}

//this returns the array of host requests, plural
export async function getHostRequests(hostId){
  const url = `http://localhost:5050/requests/host/${hostId}`
  const res = await fetch(url)
 
  if (!res.ok) {
      throw {
          message: "Failed to fetch host requests",
          statusText: res.statusText,
          status: res.status
      }
  }
  const dataPromise = await res.json()
  return dataPromise
}

//this is to get a specific request from host requests
export async function getHostRequest(requestId){
  const url1 = `http://localhost:5050/requests/${requestId}`
  const res1 = await fetch(url1)
  if (!res1.ok) {
      throw {
          message: "Failed to fetch specific request",
          statusText: res.statusText,
          status: res.status
      }
  }
  const data1 = await res1.json()

  const url2 = `http://localhost:5050/vans/${data1.requestedVanId}`
  const res2 = await fetch(url2)
  if (!res2.ok) {
    throw {
        message: "Failed to fetch specific van",
        statusText: res.statusText,
        status: res.status
    }
  }
  const data2 = await res2.json()

  const dataPromise = {request:data1, requestedVan:data2}
  return dataPromise
}

//host sends request status to user
export async function updateRequestStatus(requestId, status){

  const url = `http://localhost:5050/requests`
  const res = await fetch(url,{
    method: "PUT",
      headers:{
        "Content-Type" : "application/json"
      }, 
      body: JSON.stringify({requestId:requestId,status:status})
  })
}

export async function getHostReviews(){
  const url = "http://localhost:5050/host/review"
  const res = await fetch(url, { 
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      }, 
      credentials: "include"
    }
  )
  if (!res.ok) {
      throw {
          message: "Failed to fetch reviews",
          statusText: res.statusText,
          status: res.status
      }
  }
  const dataPromise = await res.json()
  return dataPromise
}

export async function uploadUserRequest(formData){
  const result = Object.fromEntries(formData)//changes formData object to a JSON stringifyable object
  //create a request to the host
  const res1 = await fetch("http://localhost:5050/requests", {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    credentials: "include", //this allows cookies to be sent over
    body: JSON.stringify(result)
  })
  if (!res1.ok) {
    throw {
        message: "Failed to upload the request",
        statusText: res1.statusText,
        status: res1.status
    }
}
  const host = await res1.json() //get the promised data



  const data ={hostRequest:host}
  return data
}

