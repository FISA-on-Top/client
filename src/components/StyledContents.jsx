import styled from 'styled-components';

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 700px;
  height: auto; /* 원하는 높이로 조정 */
  border: 1px solid #ccc; /* 테두리 스타일 */
  padding: 20px; /* 내부 여백 */
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
  width: 100%; /* 부모 요소 너비에 맞춤 */
  margin: 10px;
`;

export const TitleDiv = styled.div`
  width: 30%; /* 좌우 여백을 가지고 있는 요소 너비 조정 */
  height: 30px; /* 높이 조정 */
  background-color: #f2f2f2; /* 배경색 */
  padding-left: 10px;
  padding-right: 10px;
`;

export const TextDiv = styled.div`
display: flex;
flex-direction: row;
  width: 60%; /* 좌우 여백을 가지고 있는 요소 너비 조정 */
  height: 30px; /* 높이 조정 */
  background-color: #e0e0e0; /* 배경색 */
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 4px;
  margin-right: 4px; /* 우측 여백 */
`;