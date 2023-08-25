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
`;

const PopupContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 16px;
`;

function Nav1Popup({ event, isVisible, onClose }) {

    return (
        <PopupOverlay isVisible={isVisible}>
            <PopupContent>
                <h2>이벤트 상세 정보</h2>
                {event ? (
                    <>
                        <p>제목: {event.title}</p>
                        <p>내용: {event.description}</p>
                    </>
                ) : (
                    <p>이벤트 정보를 찾을 수 없습니다.</p>
                )}
                <button onClick={onClose}>닫기</button>
            </PopupContent>
        </PopupOverlay>
    );
}

export default Nav1Popup;
