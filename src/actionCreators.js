import axios from "./axios";
import { LOAD_TASKS, LOGIN, ADD_TASKS } from "./actions";

// Action Creators - podemos retornar una función con redux thunk
export function login(email, password) {
  return async function (dispatch) {
    const response = await axios.post("/login", { email, password });
    const token = response.data.token;
    const user = response.data.user;
    localStorage.setItem("token", token);
    dispatch({ type: LOGIN, payload: user });
  };
}

export function loadTasks() {
  return async function (dispatch) {
    const response = await axios.get("/tasks");
    dispatch({ type: LOAD_TASKS, payload: response.data });
  };
}

export function addTasks(task) {
  return async function (dispatch) {
    await axios.post("/tasks", task);
    dispatch({ type: ADD_TASKS, payload: task });
  };
}
