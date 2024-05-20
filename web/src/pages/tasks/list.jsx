import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getTasks } from '../../services/tasks-service';

function TaskList() {

  const [data, setData] = useState([])
  // const [groups, setGroups] = useState([])
  const navigate = useNavigate();

  useEffect(() => {

      getTasks()
        .then((response) => setData(response))
     
      // fetch("http://localhost:3000/v1/task-groups", {credentials: "include"})
      // .then(res => res.json())
      // .then(data => {
      //   setGroups(data)
      // }).catch(error => console.log("Error fetching Groups", error))

  }, []);


  if (!data) {

    return <div className='d-flex justify-content-center align-items-center'>loading...</div>;

  }

  return (
    <section className='p-4'>
      <div className='d-flex align-items-center gap-3'>
        <h1>Task list</h1>
        <Link className='btn btn-primary btn-sm' to="/new-task">Create Task</Link>
      </div>


      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Group</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Priority</th>
            <th scope="col">Labels</th>
            <th scope="col">Due to</th>
            <th scope="col">Completed</th>
          </tr>
        </thead>
        <tbody>

          {data.map((task) => (
          <tr key={task.id} onClick={() => navigate(`/tasks/${task.id}`) }> 
            <th>{task.group.name}</th>
            <td>
            <Link to={`/tasks/${task.id}`} >{task.title}</Link>
            </td>
            <td>{task.description}</td>
            <td>{task.priority}</td>
            <td>{task.labels.map(label => label+" " )}</td>
            <td>{task.dueTo}</td>
            <td>{task.completed ? "Completed" : "No completed"}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </section>
          
  )
}

export default TaskList;