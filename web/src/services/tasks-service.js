import axios from "axios"

const service = axios.create({

  withCredentials: true,
  baseURL: import.meta.env.VITE_REACT_BASE_API_URL || ""

})

service.interceptors.response.use(
  response =>  {
    return response.data
  },
  error => {
    if(error.response.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("user") 
      window.location.assign("/login")
    }
    else return Promise.reject(error);  
  })

export function getTasks(){

  return service.get("/tasks")

}

export function getTask(taskId){
  return service.get(`/tasks/${taskId}`)
}

export function deleteTask(taskId){
  return service.delete(`/tasks/${taskId}`)
}

export function createTask(body){
  return service.post("/tasks", body)
}

export function editTask(id , body){
  return service.patch(`/tasks/${id}`, body)
}