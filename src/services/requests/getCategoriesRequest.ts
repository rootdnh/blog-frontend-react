import { api } from "../api";
import { ICategory } from "../../types/news.types";

export async function categoriesRequest({signal}: {signal: AbortSignal | undefined}): Promise<ICategory[] | null> {
 try {
  const response = await api.get("/get-categories", {
   signal,
  });
  return response.data.data || null;
 } catch (error) {
    console.error(error);
    throw error;
 }
}
