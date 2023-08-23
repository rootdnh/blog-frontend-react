import {  Outlet } from "react-router-dom";
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
