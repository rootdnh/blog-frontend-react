import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { IUser } from "../../@types/authprovider.types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider/authProvider";
import Button from "react-bootstrap/Button";
import { Container, Form } from "react-bootstrap";
import 'animate.css/animate.css'; 

interface IAlert {
 type: string;
 isOpen: boolean;
 message: string;
}

export function Login() {
 const [user, setUser] = useState<IUser | null>({} as IUser);
 const [showAlert, setShowAlert] = useState<IAlert | null>({} as IAlert);
 const navigate = useNavigate();
 const { authenticate, isAuthenticated} = useAuth();

 const handleForm = async (event: React.FormEvent) => {
  event.preventDefault();

  if (user?.email && user?.password) {
   const isAuth = await authenticate(user?.email, user?.password);
    handleAuthentication(isAuth);
  }
 };

 const handleAuthentication = (isAuth: boolean)=>{
  if (!isAuth) {
    setShowAlert({
     type: "warning",
     isOpen: true,
     message: "Email ou senha estão incorretos",
    });
   } else {     
    setShowAlert({
      type: "success",
      isOpen: true,
      message: "Logado com sucesso!",
     });
     setTimeout(()=> navigate("/"), 1000);
   }
 }


 useEffect(() => {
  if (showAlert?.isOpen) {
   const timer = setTimeout(() => {
    setShowAlert({ ...showAlert, isOpen: false });
   }, 1500);
   return () => clearTimeout(timer);
  }
 }, [showAlert]);

 return (
  <Container className="d-flex flex-column justify-content-center align-items-center mb-4">
   <Form 
    style={{marginTop: "100px"}}
    className="d-flex flex-column justify-content-center align-items-center "
    onSubmit={handleForm}
   > 
   <div className="mb-3">
    <h1>Login</h1>
   </div>
    <div className="mb-3">
    <Form.Control 
    id="email"
    type="email" 
    placeholder="Enter email"
    value={user?.email ?? ""} 
    onChange={(e) => {
      setUser({ ...user, email: e.target.value });
     }}
     required
    />
    </div>
    <div className="mb-3">
     <Form.Control
      type="password"
      id="pass"
      placeholder="password"
      value={user?.password ?? ""}
      onChange={(e) => {
       setUser({ ...user, password: e.target.value });
      }}
      required
     />
    </div>
    <Button as="input" type="submit" className="w-100" value="Entrar" />
   </Form>
   {showAlert?.isOpen && (
    <Alert
     style={{maxWidth: "400px"}}
     className="m-3 animate__animated  animate__fadeIn "
     variant={showAlert?.type}
     onClose={() => setShowAlert({ ...showAlert, isOpen: false })}
     dismissible
    >
     {showAlert?.message}
    </Alert>
   )}
  </Container>
 );
}
