import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/avatarDefault.png";
import { useAuth } from "../../context/AuthProvider/authProvider";
import config from "../../config/config";
import { Image } from "react-bootstrap";

const LinkStyle = {
  textDecoration: "none", 
  color: "white", 
  padding: "10px"
}

function Header() {
  const url = config.baseUrl;
  const {email, avatar, logout} = useAuth();
  
 return (
  <Navbar expand="lg" data-bs-theme="dark" style={{backgroundColor: "rgb(36, 41, 47)"}}>
  <Container >
   <Navbar.Brand  href="/">BLOG</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse  id="basic-navbar-nav">
    <Nav className="ms-auto">
     <Link style={LinkStyle} to={"/"}>Home</Link>
     <Link style={LinkStyle} to={"/create-news"}>Criar notícia</Link>
     <Link style={LinkStyle} className="d-lg-none" to={"/settings"}>Configurações</Link>
     {
       email ? <Link style={LinkStyle} onClick={logout} to={"/"}>Sair</Link> :
       <Link style={LinkStyle} to={"/login"}>Entrar</Link>
      }
    </Nav>
   </Navbar.Collapse>
  
  </Container>
   <div    
   style={{height: "30px", width: "30px", marginRight: "20px", cursor: "pointer"}}>
   <Image 
   title={!email ? "Não logado" : email}
   data-bs-toggle="tooltip"
   className="d-none d-lg-block"
   style={{width: "100%", height: "100%", objectFit: "cover"}}
   src={avatar ? `${url}${avatar}` : defaultAvatar} 
   alt="Avatar" 
   roundedCircle
   />
   </div>
  </Navbar>
 );
}

export default Header;
