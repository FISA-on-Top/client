import React from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import { useNavigate } from 'react-router';

function MyPageWithdraw() {
    const navigater = useNavigate();

    const onWithdrawClick = () => {
        navigater('/nav1');
    }

    return (
        <ContainerDiv>
            <h1>My Page</h1>
            <h3>탈퇴 확인</h3>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>이름</TitleDiv>
                    <TextDiv><input /></TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>ID</TitleDiv>
                    <TextDiv><input /></TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>생년월일</TitleDiv>
                    <TextDiv><input /></TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>PW</TitleDiv>
                    <TextDiv><input /></TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <div>
                <button onClick={onWithdrawClick}>탈퇴하기</button>
            </div>
        </ContainerDiv>
    );
}

export default MyPageWithdraw;
