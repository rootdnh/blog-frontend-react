import { useEffect, useState } from "react";
import LoginRequest from "./utils/loginRequest"
import { IUser } from "./context/AuthProvider/types.authprovider";
import { Link, Outlet } from "react-router-dom";
import Header from "./components/header/header";

function App() {
  const [data, setData] = useState<IUser>({} as IUser);
  
  useEffect(()=>{
    async function bringData(){
     const response = await LoginRequest("root@gmail.com", "#21089");
     setData(response);
    };
    bringData()
  },[])

  return (
    <>
    <Header/>
      <h3>Logged user: 
      {
        data?.email ?? " Nenhum usuário logado"
      }
      </h3>
      <Link to={"/login"}>Login</Link>
      <Outlet/>
    </>
  )
}

export default App
