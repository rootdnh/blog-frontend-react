import axios, { AxiosError } from "axios";
import config from "../config/config";
import { getLocalStorage } from "../utils/localStorageManage";
import HttpError from "../utils/HttpError";

export const api = axios.create({
 baseURL: config.baseUrl,
});

api.interceptors.request.use((request) => {
 const data = getLocalStorage("@utk");
 if (data?.token) {
  request.headers["Authorization"] = `Bearer ${data?.token}`;
 }
 return request;
});

api.interceptors.response.use(
 (response) => response,
 (err) => {
  const status = err.response?.status;
  if (err instanceof AxiosError) {
   if (status === 500 || err?.code === "ERR_NETWORK")
    throw new HttpError("Falha de conexão", 500);

   switch (status) {
    case 401:
     throw new HttpError("Não autorizado", 401);
    case 404:
     throw new HttpError("Não encontrado", 404);
    case 400:
      throw new HttpError("Erro nos campos de entrada", 400); 
   }
   return Promise.reject(err);
  }
 }
);
