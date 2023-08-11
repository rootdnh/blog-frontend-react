import { useEffect, useState } from "react";
import LoginRequest from "./utils/loginRequest";
import { IUser } from "./context/AuthProvider/types.authprovider";
import { Link, Outlet } from "react-router-dom";
import Header from "./components/header/header";
import { Container } from "react-bootstrap";

function App() {

 return (
  <>
   <Header />
   <Container className="container-md">
    <Outlet />
   </Container>
  </>
 );
}

export default App;
