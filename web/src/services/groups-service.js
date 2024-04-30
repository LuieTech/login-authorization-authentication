import axios from "axios"

const service = axios.create({

  withCredentials: true,
  baseURL: import.meta.env.VITE.REACT_BASE_API_URL || ""

})

export function getGroups(){

  return service.get("/task-groups").then(response => response.data)

}