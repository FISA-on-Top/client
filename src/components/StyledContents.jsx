import styled from 'styled-components';

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 700px;
  height: auto;
  border: 1px solid #ccc;
  padding: 20px;
  whiteSpace: "nowrap",
`;

export const WrapperDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-top: 1px solid #ccc; 
`;

export const ContentsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 10px;
`;

export const TitleDiv = styled.div`
  width: 30%;
  height: 30px;
  background-color: #f2f2f2;
  padding-left: 10px;
  padding-right: 10px;
`;

export const TextDiv = styled.div`
display: flex;
flex-direction: row;
  width: 60%;
  height: 30px;
  background-color: #e0e0e0;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 4px;
  margin-right: 4px;
`;