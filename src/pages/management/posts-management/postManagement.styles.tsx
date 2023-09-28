import {styled} from "styled-components";


export const Container = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid black;
  margin-top: 10px;
  height: 60px;
  align-items: center;
`;

export const Title = styled.span`
  padding: 20px;
  width: 30vw;
  max-height: 100%; 
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-right: 1px solid black;
`;