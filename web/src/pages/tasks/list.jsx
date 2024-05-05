import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { getTasks } from '../../services/tasks-service';
import { useAuthContext } from '../../contexts/auth-context';

function TaskList() {

  const [data, setData] = useState([])
  // const [groups, setGroups] = useState([])
  const { user, onLogout } = useAuthContext();

  useEffect(() => {

      getTasks()
        .then((response) => setData(response))
        .catch(err => {
          if(err.response.status === 401){
            onLogout(null)
          }
        } )
     
      // fetch("http://localhost:3000/v1/task-groups", {credentials: "include"})
      // .then(res => res.json())
      // .then(data => {
      //   setGroups(data)
      // }).catch(error => console.log("Error fetching Groups", error))

  }, []);

  if(!user) return <Navigate to="/login" />

  if (!data) {

    return <div className='d-flex justify-content-center align-items-center'>loading...</div>;

  }

  return (
    <section className='p-4'>
      <h1>Task list</h1>

      {/* <select  className='ms-4 mt-2'>
        {groups.map(group => (
          <option key={group.id} > {group.name} </option>
        ))}
      </select> */}

      <label htmlFor="">
        <input type="text" />
      </label>

      <section className='row'> 
        {data.map(task => (
          <div className='col-3 p-5' key={task.id}>
            <h3>
              <Link to={`/tasks/${task.id}`} >
                {task.title}
              </Link>
            </h3>  
            <h3>{task.group.name}</h3>
          </div>
        ))}
      </section>
    </section>
  )
}

export default TaskList;