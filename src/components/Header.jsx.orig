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
        navigate('/mypage');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoutClick = () => {
        navigate('/nav1');
        onLogout();
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
