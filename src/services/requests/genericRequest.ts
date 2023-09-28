import {api} from "../api";

interface GenericProps {
  signal: AbortSignal,
  route: string
}

export async function genericRequest<T>({route, signal}: GenericProps ): Promise<T | null>{
 try {
  const response = await api.get(route, {signal});
  return response?.data;
 } catch (error) {
    throw new Error(`Error in generic request,  ${error}`);
 } 
}