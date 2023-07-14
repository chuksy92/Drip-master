import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/posts";

function postUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getPosts() {
  return http.get(apiEndPoint);
}

export function deletePost(id) {
  return http.delete(postUrl(id));
}

export function getPost(id) {
  return http.get(postUrl(id));
}

export function updatePost(id, post) {
  const body = { ...post };
  return http.put(postUrl(id), body);
}

export function addComment(id, comment) {
  return http.put(postUrl(id), { comment });
}

export function savePost(post) {
  return http.post(apiEndPoint, post);
}
