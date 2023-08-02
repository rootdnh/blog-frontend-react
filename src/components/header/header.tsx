import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const LinkStyle = {
  textDecoration: "none", 
  color: "white", 
  padding: "10px"
}

function Header() {
 return (
  <Navbar expand="lg"  data-bs-theme="dark" style={{backgroundColor: "rgb(36, 41, 47)"}}>
  <Container >
   <Navbar.Brand  href="/">BLOG</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse  id="basic-navbar-nav">
    <Nav className="ms-auto">
     <Link style={LinkStyle} to={"/"}>Home</Link>
     <Link style={LinkStyle} to={"/login"}>Logar</Link>
    </Nav>
   </Navbar.Collapse>
  </Container>
  </Navbar>
 );
}

export default Header;
