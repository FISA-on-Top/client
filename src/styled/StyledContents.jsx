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
  border-top: 2px solid #e1e1e1; 
  padding: 10px 0; // 상하 간격 추가
`;

export const ContentsDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 5px 5px; // 상하 간격을 더 크게 조정
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center; // 세로 중앙 정렬
  justify-content: center; // 가로 중앙 정렬 추가
  width: 30%;
  height: 40px; 
  background-color: #dae7f3; 
  padding: 0 15px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); 
  border-radius: 5px; 
  font-size: 1rem;
  font-weight: 800;
  margin-right: 15px; // 오른쪽 여백 추가
`;

export const TextDiv = styled.div`
  display: flex;
  align-items: center; // 내용을 중앙으로 정렬
  width: 60%;
  height: 40px;
  background-color: #e8edf3; // 좀 더 부드러운 색상으로 변경
  padding: 0 15px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); // 그림자 추가
  border-radius: 5px; // 둥근 모서리 추가
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

export const NavContainedButton = styled.button` 
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

export const NavPageContainedButton = styled.button` 
  padding-left: 10px; 
  padding-right: 10px; 
  margin-right : 5px;
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
  padding: 1px 12px; // 패딩을 조금 줄입니다.
  margin-right: 5px;
  font-size: 1rem;
  font-weight: 800;
  border: 2px solid #2B64CE;
  border-radius: 5px; // 끝을 둥글게 만듭니다.
  background-color: transparent; // 배경색을 투명하게 설정합니다.
  color: #2B64CE; 
  cursor: pointer;
  
  transition: background-color 0.3s;

  &:hover {
    background-color: #E1EBF9;
  }
`;

export const SmallContainedButton = styled.button`
  padding: 1px 12px;
  margin-right: 5px;
  font-size: 1rem;
  font-weight: 800;
  border: 2px solid #2B64CE;
  border-radius: 5px;
  background-color: #2B64CE; // 배경색을 border 색상으로 변경합니다.
  color: #ffffff;  // 텍스트 색상을 #ffffff로 변경합니다.
  cursor: pointer;
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

export const Input = styled.input`
  width: 92%;
  padding: 10px;
  margin: 0.5rem auto; // 위아래 간격은 2rem으로, 좌우 중앙 정렬을 위해 auto 사용
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Inter', sans-serif;
  display: block; // input이 block 요소로 표시되도록 설정
  
export const StyledInput = styled.input`
    display: inline-block;
    flex: 1;
    margin-right: 4px;
    width: 50px;
    border: none;
    outline: none;
    background: transparent;

`;