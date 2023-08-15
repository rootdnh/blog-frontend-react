import {api} from "../api";
import { INews } from "../../@types/news.types";

export async function createNewsRequest({idUser, title, content, idCategory}: INews, signal: AbortSignal): Promise<INews | null>{
  try {
    const {data} = await api.post<INews>("/create-post", 
    {
      idUser, 
      title, 
      content, 
      idCategory
    },{
      signal
    });
    return data;
  } catch (error) {
    console.error("Error in: create news request",error)
    return null;
  } 
}