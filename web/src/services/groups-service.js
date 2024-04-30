import axios from "axios";

const service = axios.create(

  {
    
    baseURL : import.meta.env.REACT_APP_BASE_API_URL || 'http://localhost:3000',
    withCredentials: true,
  }

);

export function getPatata(){
  return service.get("/patata").then(response => response.data)
}