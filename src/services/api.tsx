import axios, { AxiosError } from "axios";
import config from "../config/config";
import { getLocalStorage } from "../utils/localStorageManage";
import HttpError from "../utils/HttpError";
import ErrorMessages from "../utils/error.messages";

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
  console.error("API ERROR", err)
  const status = err.response?.status;

  if (
   err instanceof AxiosError &&
   (status === 500 || err?.code === "ERR_NETWORK")
  ) {
   throw new HttpError(ErrorMessages.notConnected, 500);
  }

  switch (status) {
   case 401:
    throw new HttpError(ErrorMessages.notAuthorized, 401);
   case 404:
    throw new HttpError(ErrorMessages.notFound, 404);
   case 400:
    throw new HttpError(ErrorMessages.wrongFields, 400);
   default:
    console.error(err);
    throw new HttpError(ErrorMessages.unknownError, 500);
  }
 }
);
