import axios from "axios"

const service = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_REACT_BASE_API_URL || "",
  
})

export function login(data){
  return service.post("/login", data).then(response => response.data)
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
  return service.post("/logout").then((response) => response.data)
}
