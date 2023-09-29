import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 50vw;
  height: auto;
  background-color: #e6e6e6;
  border: 1px solid black;
  justify-content: center;
  text-align: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 1rem;
  
  @media screen and (max-width: 500px){
    width: 90vw;
  }
  `;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  justify-content: center;
  gap: 20px
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
  z-index: 9999; 
`;