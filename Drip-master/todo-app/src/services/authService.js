import config from "../config.json";
import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndPoint = config.apiUrl + "/auth";

const tokenKey = "token";

async function login(email, password) {
  return http.post(apiEndPoint, { email, password });
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  if (localStorage.getItem(tokenKey)) {
    localStorage.removeItem(tokenKey);
  }
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const currentUser = jwtDecode(jwt);
    return currentUser;
  } catch (err) {}
}

function getJwt() {
  return localStorage.getItem(tokenKey);
}

http.setJwt(getJwt());

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt,
};
