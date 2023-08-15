import React from "react";
import { getLocalStorage } from "../../utils/localStorageManage";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export function ProtectedRoute({children}: {children: React.JSX.Element}): React.JSX.Element{
 const user = getLocalStorage("@utk");
const navigate = useNavigate();

 const locationToHome = ()=>{
  navigate("/");
 }

 if(user?.email){
    return children;
 }else{
  return <div className="mt-3">Você não tem acesso <Button onClick={locationToHome} size="sm" variant="dark">Voltar para página inicial</Button></div>;
 }

}