import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';

function Nav3Sub1() {
    const navigate = useNavigate();
    const location = useLocation();

    const onReturnClick = () => {
        navigate(-1);
    }

    const onSubmitClick = () => {
        navigate('/nav3/sub2');
    }

    return (
        <ContainerDiv>
            <h1>청약 취소</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>
                        청약계좌
                    </TitleDiv>
                    <TextDiv>
                        계좌를 보여줍시다.
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>
                        계좌 비밀번호
                    </TitleDiv>
                    <TextDiv>
                        <input></input>
                        <button>확인</button>
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>

            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>청약 계좌번호</TitleDiv>
                    <TextDiv>정보</TextDiv>
                    <TitleDiv>청약 계좌명</TitleDiv>
                    <TextDiv>정보</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>쳥약 등록명</TitleDiv>
                    <TextDiv>정보</TextDiv>
                    <TitleDiv>청약등록번호</TitleDiv>
                    <TextDiv>정보</TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <div>
                <button onClick={onReturnClick}>이전</button>
                <button onClick={onSubmitClick}>확인</button>
            </div>
        </ContainerDiv>
    );
}

export default Nav3Sub1;
