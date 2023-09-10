import React from 'react';

function DetailPopup({ event, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>청약 상세 정보는 아래</h2>
        <p>제목: {event.title}</p>
        <p>내용: {event.description}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default DetailPopup;
