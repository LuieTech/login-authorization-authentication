import axios from "axios"

const service = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_REACT_BASE_API_URL || "",
  
})

export function login(data){
  return service.post("/login", data).then(response => response.data)
}

export function registerUser(data){
  return service.post("/users", data)
}

export function logout(){
  return service.post("/logout").then((response) => response.data)
// Rest of the code...

}
