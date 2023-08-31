import styled from 'styled-components';

export const TableContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 8px;
  text-align: center;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #e0e0e0;
  }
`;

export const TableCell = styled.td`
  padding: 8px;
  text-align: center;
`;