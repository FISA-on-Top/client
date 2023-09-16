import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { isAdminAtom, userIdInfo, userLoggedIn } from '../state/state';
import { NavContainedButton } from '../styled/StyledContents';

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

function HeaderAdmin() {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(userLoggedIn);
    const resetIsLoggedIn = useResetRecoilState(userLoggedIn);
    const resetUserId = useResetRecoilState(userIdInfo);
    const resetIsAdmin = useResetRecoilState(isAdminAtom);

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
                {isLoggedIn ? (
                    <LogButtonDiv>
                        <NavContainedButton onClick={handleLogoutClick}>로그아웃 버튼</NavContainedButton>
                    </LogButtonDiv>
                ) : (
                    <NavContainedButton onClick={handleLoginClick}>로그인 버튼</NavContainedButton>
                )}
        </HeaderDiv>
    );
}

export default HeaderAdmin;
