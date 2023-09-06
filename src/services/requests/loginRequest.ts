import { api } from "../api";

async function LoginRequest(email: string, password: string){
try{
  const response = await api.post("/login", {email, password})
  return response.data;
  }catch(error){
    console.error("Error when trying to login", error)
    throw error;
  }
}

export default LoginRequest;

