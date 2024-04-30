import axios from "axios"

const service = axios.create({

  withCredentials: true,
  baseURL: import.meta.env.VITE_REACT_BASE_API_URL || ""

})

export function getTasks(){

  return service.get("/tasks").then(response => response.data)

}
