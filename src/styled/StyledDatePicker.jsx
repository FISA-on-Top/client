import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export const StyledDatePicker = styled(DatePicker)`
  display: flex;
  width: 66%;
  padding: 10px 15px; 
  border: 2px solid #dae7f3; 
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); 
  font-size: 1rem;
  font-weight: 700;
  color: #333;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0067ac;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;


// export const StyledDatePicker = styled(DatePicker)`
//   .react-datepicker__input-container input {
//     display:flex;
//     width: 92%;
//     padding: 10px 10px;
//     margin: 0.5rem auto; // 위아래 간격은 2rem으로, 좌우 중앙 정렬을 위해 auto 사용
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     font-family: 'Inter', sans-serif;
//     display: block; // input이 block 요소로 표시되도록 설정
//     text-align: center;
//   }
// `;