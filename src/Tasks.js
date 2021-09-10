import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import { addTasks, loadTasks } from "./actionCreators";

function Tasks() {
  const tasks = useSelector(state => state.tasks);
  const [state, setState] = useState({
    title: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

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

  // 1. Agregar la lógica al reducer
  // 2. Crear el actionCreator
  // 3. Hacer el dispatch desde el saveTask
  // function saveTask() {
  //   axios
  //     .post("http://localhost:3001/tasks", {
  //       title: state.title,
  //     })
  //     .then((response) => {
  //       // setTasks((tasks) => tasks.concat(response.data));
  //       setState((state) => ({
  //         ...state,
  //         title: "",
  //       }));
  //     });
  // }
  function saveTask() {
    const { title } = state;
    dispatch(addTasks(title));
  }

  function deleteTask(e, task) {
    e.preventDefault(); // prevenimos el comportamiento por defecto
    // axios
    //   .delete(`http://localhost:3001/tasks/${task.id}`)
    //   .then(() => setTasks(tasks.filter((t) => t.id !== task.id)))
    //   .catch((err) => console.log(err));
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
        // setTasks(
        //   tasks.map((t) =>
        //     +task.id === t.id ? { ...task, completed: !task.completed } : t
        //   )
        // );
      });
  }

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <ul className="tasks">
        {tasks.length > 0 &&
          tasks.map(task => (
            <li key={task.id}>
              <span
                className={task.completed ? "done" : null}
                onClick={() => toggleTask(task)}
              >
                {task.title}
              </span>{" "}
              <a href="#" onClick={e => deleteTask(e, task)}>
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

export default Tasks;
