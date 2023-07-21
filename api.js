/* Create a separate file to handle fetch request and export and import to desired file */
export async function getVans(){
  const res = await fetch("/api/vans")
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