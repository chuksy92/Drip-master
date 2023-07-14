import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}

export async function getUsers() {
  const users = await http.get(apiEndPoint);
  return users;
}
