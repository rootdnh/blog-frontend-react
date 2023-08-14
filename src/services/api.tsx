import axios, { AxiosError } from "axios";
import config from "../config/config";
import { getLocalStorage } from "../utils/localStorageManage";
import HttpError from "../utils/HttpError";

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
   if(err.response?.status === 401) throw new HttpError("Not authorized", 401);
   if(err.response?.status === 500 || err?.code === "ERR_NETWORK") throw new HttpError("Connection server error", 500);
  if(err.response?.status === 404) throw new HttpError ("Not found", 404);
  
  return Promise.reject(err);
    }
  }
);