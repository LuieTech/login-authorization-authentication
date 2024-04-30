import axios from "axios"

const service = axios.create({

  baseURL: import.meta.env.REACT_APP_BASE_API_URL || "http://localhost:3000",
  withCredentials: true

})

export function getTasks(){
  return service.get("/tasks").then(response => response.data)
}