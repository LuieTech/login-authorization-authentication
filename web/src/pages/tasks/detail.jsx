import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteTask, getTask } from '../../services/tasks-service';
import {format} from 'date-fns'

function TaskDetail() {
  const [task, setTask] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  //console.log(params)

  useEffect(() => {
    // fetch(`http://localhost:3000/v1/tasks/${params.id}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setTask(data);
    //   })
    //   .catch(error => {
    //     console.error("Fetching task failed: ", error);
    //   });
    getTask(params.id)
      .then(res => setTask(res))
  }, []); 

  const handleDelete = () => {
    deleteTask(task.id)
      .then(() => {
        navigate("/tasks")
      })
  }
  
  if(task === null) return <h1>Loading...</h1>

  return (
    <>
    <div className=' m-5'>
      <h1>Task detail</h1>

      <p>{task.title}</p>
      <p>{task.description}</p>
      <p>{task.priority}</p>
      <p>{format(new Date(task.dueTo), 'yyyy-MM-dd')}</p>
      <p>{task.title}</p>
      <p>...</p>

      <button 
        className='btn btn-danger btn-sm me-3'
        onClick={handleDelete}
      >
        Delete Task
      </button>
      <Link className='btn btn-primary btn-sm' to={`/edit-task/${task.id}`} >Edit Task</Link>
    </div>
    
    
    </>
    
  )
}

export default TaskDetail;