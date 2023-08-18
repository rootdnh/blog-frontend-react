import { api } from "../api";
import { ICategory } from "../../@types/news.types";

export async function categoriesRequest({
 signal,
}: {
 signal: AbortSignal;
}): Promise<ICategory[] | null> {
 try {
  const response = await api.get("/get-categories", {
   signal,
  });
  if (!response) throw new Error();
  const {data} = response.data
  return data;
 } catch (error) {
  return null;
 }
}
