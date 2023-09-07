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

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #2B64CE;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2453A6;
  }
`;

export const SmallContainedButton = styled.button` 
  padding: 8px 16px; 
  border: none;
  background-color: #0083CB;
  color: white;
  cursor: pointer;
  font-weight: bold; 
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #2453A6;
  }
`;

export const SmallEmptyButton = styled.button`
  padding: 8px 16px;
  border: 2px solid #0083CB; // border의 색상을 지정하고, 배경색을 없앱니다.
  background-color: transparent; // 배경색을 투명하게 설정합니다.
  color: #0083CB; // 텍스트 색상을 border 색상과 동일하게 설정합니다.
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2453A6;
  }
`;

export const NavButton = styled.button`
    background-color: ${props => props.isActive ? '#0083CB' : '#D9D9D9'};
    color: ${props => props.isActive ? 'white' : 'black'};
    padding: 8px 16px;
    text-decoration: none;
    margin-right: 16px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${props => props.isActive ? '#2453A6' : '#9C9C9C'};
    }
`;
