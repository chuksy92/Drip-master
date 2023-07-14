import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/todo";

function todoUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getTodos() {
  return http.get(apiEndPoint);
}

export function deleteTodo(id) {
  return http.delete(todoUrl(id));
}

export function getTodo(id) {
  return http.get(todoUrl(id));
}

export function updateTodo(id, todo) {
  const body = { ...todo };
  return http.put(todoUrl(id), body);
}

export function saveTodo(todo) {
  return http.post(apiEndPoint, todo);
}
