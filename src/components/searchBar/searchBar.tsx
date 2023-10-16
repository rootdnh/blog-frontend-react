import {  Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as S from "./searchBar.styles";

export function SearchBar() {
  
 return (
  <S.SearchBarContainer>
   <Form.Control type="text" placeholder="Search" />
   <Button className="mx-2" variant="outline-light">Search</Button>
  </S.SearchBarContainer>
 );
}
