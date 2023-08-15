import {api} from "../api";
import { INews } from "../../@types/news.types";

export async function createNewsRequest({idUser, title, content, idCategory}: INews): Promise<INews | null>{
  try {
    const {data} = await api.post<INews>("/create-post", 
    {
      idUser, 
      title, 
      content, 
      idCategory
    });
    return data;
  } catch (error) {
    console.error("Error in: create news request",error)
    return null;
  } 
}