import axios from "axios";
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
})