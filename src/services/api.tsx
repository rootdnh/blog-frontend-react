import axios, { AxiosError } from "axios";
import config from "../config/config";
import { getLocalStorage } from "../utils/localStorageManage";


export const api = axios.create({
  baseURL: config.baseUrl
})

api.interceptors.request.use((request)=>{
  const data = getLocalStorage("@utk");
  if(data?.token){
    request.headers["Authorization"] = `Bearer ${data?.token}`;
  }
  return request;
});


api.interceptors.response.use(
  (response)=> response,
  (err)=>{
   if(err instanceof AxiosError){
   if(err.response?.status === 401) throw new Error("Not authorized");
   if(err.response?.status === 500 || err?.code === "ERR_NETWORK") throw new Error("Connection server error");
   if(err.response?.status === 404) throw new Error("Not found");
  
  return Promise.reject(err);
  }
  }
);