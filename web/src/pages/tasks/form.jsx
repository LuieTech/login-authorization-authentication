import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getGroups } from '../../services/groups-service';
import { createTask, editTask, getTask } from '../../services/tasks-service';

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

function TaskForm() {
  const {id} = useParams()
  const isToEdit = id ? true : false
  const [taskEdit, setEditTask] = useState(isToEdit ? null : {})
  const [error, setError] = useState(null)
  const {register, handleSubmit, formState:{errors, isValid}} = useForm({
    mode: 'onBlur',
    values: taskEdit
  })
  const navigate = useNavigate()
  const [groups, setGroups] = useState([])

  function handleCreateTask(data){
    
    createTask(data)
      .then((task) => navigate(`/tasks/${task.id}`))
      .catch(err => {
        setError(err.response?.data.message)
      })
      
  }

  function handleEditTask(data){
    
    editTask(id, data)
      .then((task) => navigate(`/tasks/${task.id}`))
      .catch(err => {
        setError(err.response?.data.message)
      })
      
  }

  useEffect(() => {

    let effectRunning = true;

    if(isToEdit){
      getTask(id)
      .then((data) => {
        setEditTask(data)
      })
    }
    
    getGroups()
      .then((res) => {
        if(!effectRunning) return;
        setGroups(res)
      })
      .catch((err) => console.error(err))

      return () => {
        effectRunning = false;
      }

  }, [])

  if(!groups.length || taskEdit === null) return <div>Loading...</div>

  return (
    <div>
      {error && (
        <div className='alert alert-danger'>{error}</div>
      )}
      <form className='m-5' onSubmit={handleSubmit(isToEdit ? handleEditTask : handleCreateTask)}>
        <div className="mb-3">
          {/* Group */}
          <label htmlFor="group" className="form-label">Group</label>
          <select className="form-control" id="group" {...register("group")}>
            {groups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          {/* title */}
          <label htmlFor="title" className="form-label" aria-invalid={errors.title ? "true" : "false"}>Title</label>
        <input type="text" 
          className={`form-control ${errors.title ? "is-invalid" : ""}`} 
          id="title" 
          {...register("title", {required: true})}
          aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title?.type === 'required' && <p role='alert alert-danger'>Title is required</p>}
        </div>
        <div className="mb-3">
          {/* Description */}
          <label htmlFor="description" className="form-label">Description</label>
          <input autoComplete='description' type="passwtextord" className={`form-control ${errors.description? "is-invalid" : ""}`} id="description" {...register("description", {required: "Description is required"})}/>
          {errors.description && <p role='alert alert-danger'>{errors.description.message}</p>}
        </div>
        <div className="mb-3">
          {/* Priority */}
          <label htmlFor="priority" className="form-label">Priority</label>
          <select autoComplete='priority' className="form-control" id="priority" {...register("priority")}>
            <option value="P1" >High</option>
            <option value="P2">Medium</option>
            <option value="P3">Low</option>
          </select>
        </div>
        <div className="mb-3">
          {/* Due to */}
          <label htmlFor="dueTo" className="form-label">Due to</label>
          <input 
            defaultValue={tomorrow.toISOString().split("T")[0] }  
            type="date" 
            className="form-control" 
            id="dueTo" 
            {...register("dueTo")}
          />
        </div>
        <div className='d-flex gap-3'>
          <button type="submit" disabled={!isValid} className="btn btn-primary rounded-3" >{ isToEdit? "edit" : "Create"}</button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm;