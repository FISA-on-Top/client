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
            <h1>계약확인</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>청약계좌번호</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>청약계좌명</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                <TitleDiv>청약종목명</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>청약구분</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>청약주수</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>공모가(확정발행가)</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>청약수수료</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>청약증거금</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>연락처</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>환불계좌</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>        
                <ContentsDiv>
                    <TitleDiv>환불일</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>납입일</TitleDiv>
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