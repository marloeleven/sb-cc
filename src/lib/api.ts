import axios from "axios";

export const BASE_URL = "http://localhost:3000/api";

export const API_URL = `${BASE_URL}/recipe`;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
