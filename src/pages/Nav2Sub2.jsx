import React, { useEffect, useState } from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import { useNavigate } from "react-router";

function Nav2Sub2() {
    const navigate = useNavigate();

    const onConfirmClick = () => {
        navigate('/nav1');
    }

    return (
        <ContainerDiv>
            <h1>청약계좌 선택</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>계좌 번호</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>계좌 비밀번호</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                
            </WrapperDiv>
            <button onClick={onConfirmClick}>확인</button>
        </ContainerDiv>
    );
}

export default Nav2Sub2;