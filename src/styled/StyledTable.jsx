import styled from 'styled-components';

export const TableContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    
    thead {
        border-top: 2px solid #DDD; // 헤더의 아래쪽 경계를 굵게 만듭니다.
        border-bottom: 1px solid #DDD; // 헤더의 아래쪽 경계를 굵게 만듭니다.
    }
`;

export const TableHeader = styled.th`
  padding: 8px 12px;
  text-align: center;
  background-color: #E1EBF9;
  border-left: 1px solid #DDDD;
  border-right: 1px solid #DDDD;
`;

export const TableRow = styled.tr`
  padding: 8px 12px;
  &:last-of-type td {
    border-bottom: 1px solid #DDDD;
  }
`;

export const TableCell = styled.td`
  padding: 8px 3px 5px 5px;
  text-align: center;
  border-left: 1px solid #DDDD;
  border-right: 1px solid #DDDD;

`;

// const StyledTable = styled.table`
//     width: 100%;
//     border-collapse: collapse;
    
//     thead {
//         border-top: 2px solid #DDD; // 헤더의 아래쪽 경계를 굵게 만듭니다.
//         border-bottom: 1px solid #DDD; // 헤더의 아래쪽 경계를 굵게 만듭니다.
//     }
    
//     th {
//         padding: 8px 12px;
//         background-color: #E1EBF9;
//     }
//     td {
//         padding: 8px 12px;
//         text-align: center;
//     }


// `;
