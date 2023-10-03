import { styled } from "styled-components";

export const Container = styled.div`
 display: grid;
 grid-template-columns: repeat(3, 1fr) 15%;
 width: 100%;
 border: 1px solid black;
 margin-top: 10px;
 height: 40px;
 align-items: center;
`;

export const Title = styled.span`
 padding: 10px;
 height: 100%;
 overflow: hidden;
 white-space: nowrap;
 text-overflow: ellipsis;
 border-right: 1px solid black;

 &:last-child {
  border-right: none;
 }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  

 button {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
   display: block;
   height: 2em;
   aspect-ratio: 1;
  }

  a {                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
   display: block;
   height: 2em;
   aspect-ratio: 1;
  }

#delete {
  background-color: #df0909
}

svg {
  position: relative;                                                                                                                                                  ative;
  left: 50%;
  transform: translate(-50%);
  vertical-align: baseline;
}
 
`;
