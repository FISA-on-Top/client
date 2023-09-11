import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { isAdminAtom, userIdInfo, userLoggedIn } from '../state/state';

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

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(userLoggedIn);
    const resetIsLoggedIn = useResetRecoilState(userLoggedIn);
    const resetUserId = useResetRecoilState(userIdInfo);
    const resetIsAdmin = useResetRecoilState(isAdminAtom);

    const handleMyPageClick = () => {
        navigate('/mypage');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoutClick = () => {
        resetIsAdmin();
        resetIsLoggedIn();
        resetUserId();
        navigate('/login');
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
                    <button onClick={handleLoginClick}>로그인 버튼</button>

                )}
            </header>
        </HeaderDiv>
    );
}

export default Header;
