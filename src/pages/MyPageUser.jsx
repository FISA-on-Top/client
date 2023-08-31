import React from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import { useNavigate } from 'react-router';

function MyPage() {
    const navigate = useNavigate();

    const onModClick = () => {
        navigate('/mypage/mod');
    }

    const onWithdrawClick = () => {
        navigate('/mypage/withdraw');
    }


    return (
        <ContainerDiv>
            <h1>My Page</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>이름</TitleDiv>
                    <TextDiv>확인 후 받아오고</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>ID</TitleDiv>
                    <TextDiv>확인 후 받아오고</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>생년월일</TitleDiv>
                    <TextDiv>확인 후 받아오고</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>핸드폰</TitleDiv>
                    <TextDiv>확인 후 받아오고</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>Email</TitleDiv>
                    <TextDiv>확인 후 받아오고</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>계좌 번호</TitleDiv>
                    <TextDiv>확인 후 받아오고</TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <div>
                <button onClick={onModClick}>수정하기</button>
                <button onClick={onWithdrawClick}>탈퇴하기</button>
            </div>
        </ContainerDiv>
    );
}

export default MyPage;
