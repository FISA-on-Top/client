import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;
  flex-direction: column;
  margin: 4px; 
`;

const LogButtonDiv = styled.div`
display: flex;
flex-direction: row;
gap: 4px;
`;

function Header({ isLoggedIn, onLogin, onLogout }) {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    // 마이페이지 버튼 클릭 시 '/mypage' 경로로 이동합니다.
    navigate('/mypage');
  };

  const handleLoginClick = () => {
    // 로그인 버튼 클릭 시 '/login' 경로로 이동합니다.
    // onLogin();
    navigate('/login');
  };

  const handleLogoutClick = () => {
    // 로그아웃 버튼 클릭 시 '/mainpage' 경로로 이동합니다.
    navigate('/nav1');
    onLogout(); // 로그아웃 동작 실행
  };

  return (
    <HeaderDiv>
      <header>
        {isLoggedIn ? (
          <LogButtonDiv>
            <button onClick={handleMyPageClick}>마이페이지 버튼</button>
            <button onClick={handleLogoutClick}>로그아웃 버튼</button>
          </LogButtonDiv>
        ) : (
          <button onClick={handleLoginClick} isLoggedIn={isLoggedIn} onLogin={onLogin}>로그인 버튼</button>
        )}
      </header>
    </HeaderDiv>
  );
}

export default Header;
