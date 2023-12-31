import {api} from "../api";
import { INews } from "../../types/news.types";
import { AxiosError } from "axios";
import ErrorMessages from "../../utils/error.messages";

export async function createNewsRequest({idUser, title, content, idCategory}: INews, signal: AbortSignal | null): Promise<INews | null | Error>{
  try {
    if(!signal) throw new Error("AbortSignal is required for the request");
    const {data} = await api.post<INews>("/create-post", 
    {
      idUser, 
      title, 
      content, 
      idCategory,
    },{
      signal
    });
    return data;
  } catch (error) {
    if(error instanceof AxiosError){
      const message = error?.response?.data?.msg ?? ErrorMessages.unknownError;
      console.error("Create news error: ", error);
      throw new Error(message);
    }
   throw new Error(ErrorMessages.unknownError);
  } 
}