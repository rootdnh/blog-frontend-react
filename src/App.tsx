import {  Outlet } from "react-router-dom";
import Header from "./components/header/header";
import { Container } from "react-bootstrap";
import GlobalStyles from "./layout/globalStyles";
import {ThemesProvider} from "./context/ThemeContext/themeProvider";

function App() {

 return (
  <ThemesProvider>
   <Header />
   <Container className="container-md">
    <Outlet />
   </Container>
   <GlobalStyles/>
  </ThemesProvider>
 );
}

export default App;
