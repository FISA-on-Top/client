import styled from 'styled-components';

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 1000px;
  height: auto;
  border: 1px solid #ccc;
  padding: 20px;
  whiteSpace: "nowrap",
`;

export const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 2px solid #e1e1e1; 
  padding: 10px 0;
`;

export const ContentsDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 5px 5px;
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 40px; 
  background-color: #dae7f3; 
  padding: 0 15px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); 
  border-radius: 5px; 
  font-size: 1rem;
  font-weight: 800;
  margin-right: 15px;
`;

export const TextDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 40px;
  background-color: #e8edf3;
  padding: 0 15px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-right: 15px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  margin-bottom: 5px;
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
  padding: 1px 12px;
  margin-right: 5px;
  font-size: 0.9rem;
  font-weight: 800;
  border: 2px solid #2B64CE;
  border-radius: 5px;
  background-color: transparent;
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
  font-weight: 800;
  border: 2px solid #2B64CE;
  border-radius: 5px;
  background-color: #2B64CE;
  color: #ffffff;
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

export const CellButton = styled.button`
  padding: 1px 12px;
  margin-right: 5px;
  font-weight: bold;
  text-decoration: underline;
  border: none;
  background-color: transparent;
  color: #0083cb;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #0067ac;
  }
`;


export const Input = styled.input`
  width: 92%;
  padding: 10px;
  margin: 0.5rem auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Inter', sans-serif;
  display: block;
`;
  
export const StyledInput = styled.input`
    width: 92%;
    padding: 10px;
    margin: 0.5rem auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Inter', sans-serif;
    display: block;
`;