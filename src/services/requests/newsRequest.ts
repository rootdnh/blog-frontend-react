import {api} from "../api";
import { INews } from "../../@types/news.types";

export async function createNewsRequest({idUser, title, content, idCategory}: INews, signal: AbortSignal | null): Promise<INews | null>{
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
    if(!data) throw new Error();
    return data;
  } catch (error) {
    console.error("Error in: create news request",error)
    return null;
  } 
}