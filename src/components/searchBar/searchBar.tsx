import {  Button, Form } from "react-bootstrap";
import * as S from "./searchBar.styles";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export function SearchBar() {

  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();


  const handleSearch = () => {
    const itemSearched = searchRef?.current?.value.trim();
  
    if(itemSearched){
      return navigate(`/search?q=${itemSearched}`);
     }
  }

 return (
  <S.SearchBarContainer>
   <Form.Control ref={searchRef} type="text" placeholder="Buscar" />
   <Button className="mx-2" onClick={handleSearch} variant="outline-light">Search</Button>
  </S.SearchBarContainer>
 );
}
