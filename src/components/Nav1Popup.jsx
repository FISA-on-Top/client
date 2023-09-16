import React from 'react';
import styled from 'styled-components';
import { TableRow } from '../styled/StyledTable.jsx';
const PopupOverlay = styled.div`
    class : PopupOverLay;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${props => props.isVisible ? 'block' : 'none'};
    justify-content: center;
    align-items: center;
`;

const PopupContent = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 100px;
`;

const CloseButton = styled.button`
    display: block;
    margin: 0 auto;
    padding: 1px 12px;
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

const Table = styled.table`
    height: 300px;
    width: 700px;
    border-collapse: collapse;

    thead {
        border-top: 2px solid #DDD;
        border-bottom: 1px solid #DDD;
    }
`;

const Th = styled.th`
    padding: 8px 12px;
    text-align: center;
    height: 100%;
    width: 30%;
    background-color: #E1EBF9;
    border-left: 1px solid #DDDD;
    border-right: 1px solid #DDDD;
`;

const Td = styled.td`
    padding: 8px 3px 5px 5px;
    text-align: center;
    border-left: 1px solid #DDDD;
    border-right: 1px solid #DDDD;
`;

function Nav1Popup({ event, isVisible, onClose }) {

    return (
        <PopupOverlay isVisible={isVisible}>

            <PopupContent>
                <h2>청약종목안내 상세</h2>
                {event ? (
                    <Table>
                        <tbody>
                            <TableRow>
                                <Th>기업코드</Th>
                                <Td>{event.corpCode}</Td>
                                </TableRow>
                            <TableRow>
                                <Th>기업명</Th>
                                <Td>{event.corpName}</Td>
                            </TableRow>
                            <TableRow>
                                <Th>청약기일</Th>
                                <Td>{event.sbd}</Td>
                            </TableRow>
                            <TableRow>
                                <Th>납입기일</Th>
                                <Td>{event.pymd}</Td>
                            </TableRow>
                            <TableRow>
                                <Th>환불일</Th>
                                <Td>{new Date(event.refund).toISOString().split('T')[0]}</Td>
                            </TableRow>
                            <TableRow>
                                <Th>상장예정일</Th>
                                <Td>{new Date(event.ipoDate).toISOString().split('T')[0]}</Td>
                            </TableRow>
                            <TableRow>
                                <Th>확정발행가</Th>
                                <Td>{event.slprc}</Td>
                            </TableRow>
                            <TableRow>
                                <Th>(법인)구분</Th>
                                <Td>{event.corpCls}</Td>
                            </TableRow>
                            <TableRow>
                                <Th>증권수량</Th>
                                <Td>{event.stkcnt}</Td>
                            </TableRow>
                            <TableRow>
                                <Th>증자방법</Th>
                                <Td>{event.capitalIncrease}</Td>
                            </TableRow>
                        </tbody>
                    </Table>
                ) : (
                    <p> 상세 정보를 찾을 수 없습니다.</p>
                )}

                <CloseButton onClick={onClose}>닫기</CloseButton>

            </PopupContent>
        </PopupOverlay>
    );
}

export default Nav1Popup;
