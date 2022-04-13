import axios from "axios";
import { BASE_API_URL } from "../config/index";
import { getToken, setToken } from "./storage";

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const setTokenAxios = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`
}
const setUpToken = (token) => {
  setTokenAxios(token);
  setToken(token);
};

setTokenAxios(getToken());

export { api, setUpToken };
