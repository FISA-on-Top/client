import React from "react";
import { useNavigate } from "react-router-dom";
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';


function SignupId() {
    const navigate = useNavigate();

    const onNextButton = () => {
        navigate('/login');
    }

    return (
        <ContainerDiv>
            <h1>Sign up</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <div>
                        이미지
                        회원가입 1단계
                    </div>
                    <div>
                        이미지
                        회원가입 2단계
                    </div>
                </ContentsDiv>
            </WrapperDiv>

            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>이름</TitleDiv>
                    <TextDiv>
                        <input />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>ID입력</TitleDiv>
                    <TextDiv>
                        <input />
                        <button>중복확인</button>
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>PW입력</TitleDiv>
                    <TextDiv>
                        <input />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>PW확인</TitleDiv>
                    <TextDiv>
                        <input />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>email</TitleDiv>
                    <TextDiv>
                        <input />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>전화번호</TitleDiv>
                    <TextDiv>
                        <input />
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <button onClick={onNextButton}>등록</button>
        </ContainerDiv>
    );
}

export default SignupId;