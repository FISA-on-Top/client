import React from 'react';
import styled from 'styled-components';

const PopupOverlay = styled.div`
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
    padding: 16px;
`;

const CloseButton = styled.button`
    display: block;
    margin: 0 auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    background-color: #f2f2f2;
    text-align: left;
    padding: 8px;
`;

const Td = styled.td`
    padding: 8px;
    border-bottom: 1px solid #ddd;
`;

function Nav1Popup({ event, isVisible, onClose }) {

    return (
        <PopupOverlay isVisible={isVisible}>
            
            <PopupContent>
                <h2>이벤트 상세 정보</h2>
                {event ? (
                    <Table>
                        <tbody>
                            <tr>
                                <Th>항목</Th>
                                <Th>값</Th>
                            </tr>
                            <tr>
                                <Td>ipo_id</Td>
                                <Td>{event.ipoId}</Td>
                            </tr>
                            <tr>
                                <Td>corp_code</Td>
                                <Td>{event.corpCode}</Td>
                            </tr>
                            <tr>
                                <Td>corp_name</Td>
                                <Td>{event.corpName}</Td>
                            </tr>
                            <tr>
                                <Td>sbd</Td>
                                <Td>{event.sbd}</Td>
                            </tr>
                            <tr>
                                <Td>pymd</Td>
                                <Td>{event.pymd}</Td>
                            </tr>
                            <tr>
                                <Td>refund</Td>
                                <Td>{event.refund}</Td>
                            </tr>
                            <tr>
                                <Td>ipo_date</Td>
                                <Td>{event.ipoDate}</Td>
                            </tr>
                            <tr>
                                <Td>slprc</Td>
                                <Td>{event.slprc}</Td>
                            </tr>
                            <tr>
                                <Td>corp_cls</Td>
                                <Td>{event.corpCls}</Td>
                            </tr>
                            <tr>
                                <Td>stkcnt</Td>
                                <Td>{event.stkcnt}</Td>
                            </tr>
                            <tr>
                                <Td>capital_increase</Td>
                                <Td>{event.capitalIncrease}</Td>
                            </tr>
                        </tbody>
                    </Table>
                ) : (
                    <p>이벤트 정보를 찾을 수 없습니다.</p>
                )}

                <CloseButton onClick={onClose}>닫기</CloseButton>

            </PopupContent>
        </PopupOverlay>
    );
}

export default Nav1Popup;
