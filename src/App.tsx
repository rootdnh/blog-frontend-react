import { useEffect, useState } from "react";
import LoginRequest from "./utils/loginRequest"
import { IUser } from "./context/AuthProvider/types.authprovider";
import { Link, Outlet } from "react-router-dom";

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
      <h3>Logged user: {data?.email}</h3>
      <Link to={"/login"}>Here</Link>
      <Outlet/>
    </>
  )
}

export default App
