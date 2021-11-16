import axios from "axios";


const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
  .currentUser?.accessToken;  


export const axiosWithoutJwtInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  //  baseURL: process.env.REACT_APP_API_URL,
   timeout: 5000,
   headers: {
     "Content-Type": "application/json",
     Accept: "application/json",
   },
 });

 export const axiosWithJwtInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  //  baseURL: process.env.REACT_APP_API_URL,
   timeout: 5000,
   headers: {
     "Content-Type": "application/json",
     Accept: "application/json",
     token:`Bearer ${token}`,
   },
 });

