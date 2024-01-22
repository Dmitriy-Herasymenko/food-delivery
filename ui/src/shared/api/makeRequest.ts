import axios from "axios";
import { config } from "./config";

export const api = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     } else {
//       window.location.href = "/login";
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.token) {
      const {token, userId, email, userName} = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
      localStorage.setItem("userName", userName);
    }
    return response;
  },
  (error) => {
    // Обробка помилок
    return Promise.reject(error);
  }
);


// api.interceptors.response.use(
//   (response: any) => {
//     if (response.data.status !== 0) {
//       throw new Error(response.data.message);
//     }
//     if (response.status === 2) {
//       throw new Error(response.message);
//     }
//     if (response.status === 500) {
//       throw new Error(response.message);
//     }
//     if (response.status === 400) {
//       throw new Error(response.message);
//     }
//     return response;
//   },
//   (err) => {
//     if (401 === err.response.status) {
//       window.location.href = "/login";
//     } else {
//       throw new Error(err.response?.data?.title || 'Something went wrong');
//     }
//     throw new Error(err);
//   }
// );
