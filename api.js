/* Create a separate file to handle fetch request and export and import to desired file */
export async function getVans(){
  const response = await fetch("/api/vans")
  const data = await response.json()
  return data.vans
}