import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 80vh;
  padding: 10px;
  top: 20px;
  background-color: ${(props)=> props.theme.colors.primary};
  border: 1px solid black;
  border-radius: 10px;
  gap: 20px;

  span {
    margin-top: auto;
  }
`;