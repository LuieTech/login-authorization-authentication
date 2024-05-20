import axios from "axios"

const service = axios.create({

  withCredentials: true,
  baseURL: import.meta.env.VITE_REACT_BASE_API_URL || ""

})

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if(error.response.data === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("user")
      window.location.assign("/login")
    }
    else return Promise.reject(error)  
  })

export function getGroups(){

  return service.get("/task-groups")

}