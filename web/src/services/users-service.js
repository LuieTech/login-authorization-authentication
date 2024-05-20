import axios from "axios"
import { useAuthContext } from "../contexts/auth-context"
 
const service = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_REACT_BASE_API_URL || "",
  
})

service.interceptors.response.use(
  response => {
    return response.data
  }, 
  error => {
    if(error.response.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("user")
      window.location.assign("/login");
    }
    else return Promise.reject(error)
  })

export function login(data){
  return service.post("/login", data)
}

export function registerUser(data){

  const formData = new FormData() 

  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password)
  if(data.avatar){
    formData.append('avatar', data.avatar[0])
  }
  
  return service.post("/users", formData)
}

export function logout(){
  return service.post("/logout")
}
