import React from "react";
import { useAuth } from "../../context/AuthContext/authProvider";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({
 children,
}: {
 children: React.JSX.Element;
}): React.JSX.Element {
 const {email} = useAuth();
 const navigate = useNavigate();

 const locationToHome = () => {
  navigate("/");
 };

 if (email) {
  return children;
 } else {
  return (
   <div className="mt-3">
    Acesso não autorizado {'\u00A0'}
    <Button onClick={locationToHome} size="sm" variant="dark">
     Voltar a página inicial
    </Button>
   </div>
  );
 }
}
