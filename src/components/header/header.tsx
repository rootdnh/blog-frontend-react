import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import defaultAvatar from "../../assets/avatarDefault.png";
import { useAuth } from "../../context/AuthProvider/authProvider";
import config from "../../config/config";
import { Image } from "react-bootstrap";
import { menuLinks } from "./menuItems";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function Header() {
 const url = config.baseUrl;
 const { email, avatar, isAuthenticated, logout } = useAuth();
 const navigate = useNavigate();

 const menuTemp = Object.entries(menuLinks).filter(([key, item])=>{
  if (key === 'login' && isAuthenticated()) {
    return false;
  } 
  if(key === 'logout' && !isAuthenticated()) {
   return false;
  }
  return item;
 })

 const LinkStyle = {
  textDecoration: "none",
  color: "white",
  padding: "10px",
 };

 enum dropdownItems  {
  posts = '/management/posts',
  category = '/management/category',
  users = '/management/users'
 }

 type DropdownItems = keyof typeof dropdownItems;

 const handleDropdownSelect = (eventKey: DropdownItems) =>{
  navigate(dropdownItems[eventKey]);
 }
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
      {menuTemp.map(([key, item]) => {
       if(item.visible === true){
       return (
        <LinkContainer style={LinkStyle} key={key} to={item.path}>
         <Nav.Link
          key={key}
          active={true}
          onClick={() => {
           if (key === "logout") return logout();
          }}
         >
          {item.name}
         </Nav.Link>
        </LinkContainer>
       )};
      })}
     </Nav>
     <Nav onSelect={handleDropdownSelect}>
     <Dropdown as={NavItem}>
      <Dropdown.Toggle className="text-white" as={NavLink}>Gerenciar</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="posts">Posts</Dropdown.Item>
        <Dropdown.Item eventKey="category">Categoria</Dropdown.Item>
        <Dropdown.Item eventKey="users">Usuário</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
