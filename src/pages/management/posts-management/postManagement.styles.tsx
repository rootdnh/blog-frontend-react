import { styled } from "styled-components";

export const Container = styled.div`
 display: grid;
 grid-template-columns: repeat(3, 1fr) 15%;
 width: 100%;
 border: 1px solid gray;
 border-radius: 10px;
 margin-top: 10px;
 height: 2.5rem;
 justify-content: center;
 align-items: center;
 


 @media screen and (max-width: 530px){
  height: auto;
 }
`;

export const Title = styled.span`
 padding: 10px;
 height: 100%;
 overflow: hidden;
 white-space: nowrap;
 text-overflow: ellipsis;
 border-right: 1px solid var(--dark-color);

 &:last-child {
  border-right: none;
 }
 @media screen and (max-width: 530px){
  padding: 5px;
  max-height: 5rem;
  white-space: normal;
  text-overflow: none;

 }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  

 button, a{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
   display: block;
   position: relative;
   height: 2rem;
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
