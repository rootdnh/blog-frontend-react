import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import defaultAvatar from "../../assets/avatarDefault.png";
import { useAuth } from "../../context/AuthProvider/authProvider";
import config from "../../config/config";
import { Image } from "react-bootstrap";
import { menuLinks } from "./menuItems";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
 const url = config.baseUrl;
 const { email, avatar, isAuthenticated, logout } = useAuth();
 const menuTemp = { ...menuLinks };

 if (isAuthenticated()) {
  delete menuTemp.login;
 } else {
  delete menuTemp.logout;
 }
 const menuItems = Object.entries(menuTemp);

 const LinkStyle = {
  textDecoration: "none",
  color: "white",
  padding: "10px",
 };

 return (
  <Navbar
   expand="lg"
   collapseOnSelect
   data-bs-theme="dark"
   style={{ backgroundColor: "rgb(36, 41, 47)" }}
   sticky="top"
  >
   <Container>
    <Navbar.Brand href="/">BLOG</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="ms-auto">
      {menuItems.map(([key, item]) => {
       return (
        <LinkContainer style={LinkStyle} key={key} to={item.path}>
         <Nav.Link
          key={key}
          onClick={() => {
           if (key === "logout") return logout();
          }}
         >
          {item.name}
         </Nav.Link>
        </LinkContainer>
       );
      })}
     </Nav>
    </Navbar.Collapse>
   </Container>
   <div
    style={{
     height: "30px",
     width: "30px",
     marginRight: "20px",
     cursor: "pointer",
    }}
   >
    <Image
     title={!email ? "Não logado" : email}
     data-bs-toggle="tooltip"
     className="d-none d-lg-block"
     style={{ width: "100%", height: "100%", objectFit: "cover" }}
     src={avatar ? `${url}/uploads/${avatar}` : defaultAvatar}
     alt="Avatar"
     roundedCircle
    />
   </div>
  </Navbar>
 );
}

export default Header;
