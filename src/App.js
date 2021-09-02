import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [state, setState] = useState({
    title: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/tasks/")
      .then((response) => setTasks(response.data))
      .catch((err) => console.log(err));
  }, []);

  function updateTitle(e) {
    setState({
      ...state,
      title: e.target.value,
    });
  }

  /*async function saveTask() {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos/', { title: state.title })
      setTasks((tasks) => tasks.concat(response.data));
      setState((state) => ({
        ...state,
        title: ""
      }));
    } catch (err) {
      // manejo del error
      console.log(err)
    }
  }*/

  function saveTask() {
    axios
      .post("http://localhost:3001/tasks", {
        title: state.title,
      })
      .then((response) => {
        setTasks((tasks) => tasks.concat(response.data));
        setState((state) => ({
          ...state,
          title: "",
        }));
      });
  }

  function deleteTask(e, task) {
    e.preventDefault(); // prevenimos el comportamiento por defecto
    axios
      .delete(`http://localhost:3001/tasks/${task.id}`)
      .then(() => setTasks(tasks.filter((t) => t.id !== task.id)))
      .catch((err) => console.log(err));
  }

  function toggleTask(task) {
    axios
      .put(`http://localhost:3001/tasks/${task.id}`, {
        data: {
          ...task,
          completed: !task.completed,
        },
      })
      .then(() => {
        setTasks(
          tasks.map((t) =>
            +task.id === t.id ? { ...task, completed: !task.completed } : t
          )
        );
      });
  }

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <ul className="tasks">
        {tasks.length > 0 &&
          tasks.map((task) => (
            <li key={task.id}>
              <span
                className={task.completed ? "done" : null}
                onClick={() => toggleTask(task)}
              >
                {task.title}
              </span>{" "}
              <a href="#" onClick={(e) => deleteTask(e, task)}>
                x
              </a>
            </li>
          ))}
      </ul>
      <input type="text" value={state.title} onChange={updateTitle} />
      <button onClick={saveTask}>Crear Tarea</button>
    </div>
  );
}
