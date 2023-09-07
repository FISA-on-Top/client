import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { isAdminAtom, userIdInfo, userLoggedIn } from '../state/state';
import { SmallContainedButton } from '../styled/StyledContents';

const HeaderDiv = styled.div`
  display: flex;
  position: relative;
  align-items: flex-end;
  flex-direction: column;
  margin: 4px; 
`;

const LogButtonDiv = styled.div`
  display: flex; // flex display를 활성화하여 버튼들을 일렬로 정렬합니다.
  flex-direction: row; // 버튼들을 수평으로 정렬합니다.
  gap: 8px; // 버튼 사이의 간격을 설정합니다.
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
                {isLoggedIn ? (
                    <LogButtonDiv>
                        <SmallContainedButton onClick={handleMyPageClick}>마이페이지</SmallContainedButton>
                        <SmallContainedButton onClick={handleLogoutClick}>로그아웃</SmallContainedButton>
                    </LogButtonDiv>

                ) : (                       
                    <SmallContainedButton onClick={handleLoginClick}>로그인</SmallContainedButton>                  
                )}
        </HeaderDiv>
    );
}

export default Header;
