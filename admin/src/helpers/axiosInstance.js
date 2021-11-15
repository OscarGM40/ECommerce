import axios from "axios";

// const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzgyYmIwYzI1NjM1ODk0ZWEyMDExOCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2MzUyNjU0ODgsImV4cCI6MTYzNTUyNDY4OH0.n2--o7Bcazc94S511rtS40G75BISAx8WD7nQQLY08pk"

 const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser?.accessToken; 

export const axiosWithoutJwtInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosWithJwtInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    token: `Bearer ${token}`,
  },
});
