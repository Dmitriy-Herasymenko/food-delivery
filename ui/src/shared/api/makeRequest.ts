import axios from "axios";
import { config } from "./config";

export const api = axios.create({
  baseURL: config.baseUrl,
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json'
  // },
});

api.interceptors.request.use(
  (config) => {
    // if (!!config.headers)
    //   config.headers["Authorization"] = `Bearer ${localStorage.getItem(
    //     "token"
    //   )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error.response.headers);
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
