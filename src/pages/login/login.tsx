import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/authProvider";
import Button from "react-bootstrap/Button";
import { Container, Form } from "react-bootstrap";
import "animate.css/animate.css";
import { IAlert } from "../../types/utils.types";
import ErrorMessages from "../../utils/error.messages";

export function Login() {
 const emailRef = useRef<HTMLInputElement>(null);
 const passwordRef = useRef<HTMLInputElement>(null);
 const [showAlert, setShowAlert] = useState<IAlert | null>({} as IAlert);
 const navigate = useNavigate();
 const { authenticate } = useAuth();

 const handleForm = (event: React.FormEvent) => {
  event.preventDefault();
  const email = emailRef?.current?.value;
  const password = passwordRef?.current?.value;

  if (email && password) {
   authenticate(email, password)
    .then((isAuth) => handleAuthentication(!!isAuth))
    .catch((error)=>{
      if(error.status === 400){
        setShowAlert({
          type: "warning",
          isOpen: true,
          message: ErrorMessages.wrongLogin
        });
      }else {
        setShowAlert({
          type: "warning",
          isOpen: true,
          message: error.message
        });
      }
    })
   
  }
 };

 const handleAuthentication = (isAuth: boolean) => {
  if (!isAuth) {
   setShowAlert({
    type: "warning",
    isOpen: true,
    message: ErrorMessages.unknownErrorLogin,
   });
  } else {
   setShowAlert({
    type: "success",
    isOpen: true,
    message: "Logado com sucesso!",
   });
   setTimeout(() => navigate("/"), 1000);
  }
 };

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
    style={{ marginTop: "100px" }}
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
      ref={emailRef}
      required
     />
    </div>
    <div className="mb-3">
     <Form.Control
      type="password"
      id="pass"
      placeholder="password"
      ref={passwordRef}
      required
     />
    </div>
    <Button as="input" type="submit" className="w-100" value="Entrar" />
   </Form>

   {showAlert?.isOpen && (
    <Alert
     style={{ maxWidth: "400px" }}
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
