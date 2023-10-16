import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import defaultAvatar from "../../assets/avatarDefault.png";
import { useAuth } from "../../context/AuthContext/authProvider";
import config from "../../config/config";
import { Image } from "react-bootstrap";
import { menuLinks } from "./menuItems";
import { LinkContainer } from "react-router-bootstrap";
import { SearchBar } from "../searchBar/searchBar";


function Header() {
  //need a refactor
 const url = config.baseUrl;
 const { email, avatar, isAuthenticated, logout } = useAuth();

 const menuTemp = Object.entries(menuLinks).filter(([key, item]) => {
  if (key === "login" && isAuthenticated()) {
   return false;
  }
  if (key === "logout" && !isAuthenticated()) {
   return false;
  }
  if(key === "createNews" && !isAuthenticated()){
    return false;
  }
  return item;
 });

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
    <Navbar.Collapse id="basic-navbar-nav" className="caollapse">
    <SearchBar />
     <Nav className="ms-auto">
      {menuTemp.map(([key, item]) => {
       if (item.visible === true) {
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
        );
       }
      })}
     </Nav>
    {isAuthenticated() &&
     <Dropdown as={NavItem}>
      <Dropdown.Toggle className="text-white" as={NavLink}>
       Gerenciar
      </Dropdown.Toggle>
      <Dropdown.Menu>
       <Dropdown.Item>
        <LinkContainer to={"management/posts"}>
         <Nav.Link>Posts</Nav.Link>
        </LinkContainer>
       </Dropdown.Item>

       <Dropdown.Item>
        <LinkContainer to={"management/category"}>
         <Nav.Link>Categoria</Nav.Link>
        </LinkContainer>
       </Dropdown.Item>

       <Dropdown.Item>
        <LinkContainer to={"management/user"}>
         <Nav.Link>Usuário</Nav.Link>
        </LinkContainer>
       </Dropdown.Item>
      </Dropdown.Menu>
     </Dropdown>
     }
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
