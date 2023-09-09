import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/avatarDefault.png";
import { useAuth } from "../../context/AuthProvider/authProvider";
import config from "../../config/config";
import { Image } from "react-bootstrap";
import { menuLinks } from "./menuItems";
import { useState } from "react";


function Header() {
 const url = config.baseUrl;
 const { email, avatar, isAuthenticated, logout } = useAuth();
 const [showMobileMenu, setShowMobileMenu] = useState(false);
 const menuTemp = {...menuLinks};

 if(isAuthenticated()){
  delete menuTemp.login;
 }else {
  delete menuTemp.logout;
 }
 const menuItems = Object.entries(menuTemp);
 
 const LinkStyle = {
  textDecoration: "none",
  color: "white",
  padding: "10px",
 };
 
 const handleMenuClose = (key: string) => {
  if(key == "logout") logout();
  setShowMobileMenu(!showMobileMenu)
 }

 return (
  <Navbar
   expand="lg"
   expanded={showMobileMenu}
   data-bs-theme="dark"
   style={{ backgroundColor: "rgb(36, 41, 47)" }}
  >
   <Container>
    <Navbar.Brand href="/">BLOG</Navbar.Brand>
    <Navbar.Toggle onClick={() => setShowMobileMenu(!showMobileMenu)} aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="ms-auto">
      {menuItems.map(([key, item]) => {
       return (
        <Link  onClick={()=> handleMenuClose(key)}
          style={LinkStyle} key={key} to={item.path}>
         {item.name}
        </Link>
       )})
      }

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
