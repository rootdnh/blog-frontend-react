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
   <Form.Control 
    id="form-search"
    ref={searchRef} 
    type="text" 
    placeholder="Pesquise uma notícia..." 
    onKeyUp={(e)=> (e.key === "Enter") ? handleSearch() : null}
   />
   <Button 
    className="mx-2" 
    onClick={handleSearch} 
    variant="outline-light"
   >Buscar</Button>

  </S.SearchBarContainer>
 );
}
