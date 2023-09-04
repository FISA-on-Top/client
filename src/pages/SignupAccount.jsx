import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';

function SignupAccount() {
    const navigate = useNavigate();
    const [accountNum, setAccountNum] = useState();
    const [accountPw, setAccountPw] = useState();
    const [birthDay, setBirthDay] = useState();

    const handleAccountNumChange = (event) => {
        setAccountNum(event.target.value);
    };

    const handleAccountPwChange = (event) => {
        setAccountPw(event.target.value);
    };

    const handleBirthDayChange = (event) => {
        setBirthDay(event.target.value);
    }

    const onNextButton = () => {
        navigate('/signupId');
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
                    <TitleDiv>
                        계좌 번호
                    </TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={accountNum}
                            onChange={handleAccountNumChange}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>
                        계좌 비밀번호
                    </TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={accountPw}
                            onChange={handleAccountPwChange}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>
                        생년월일
                    </TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={birthDay}
                            onChange={handleBirthDayChange}
                        />
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <button onClick={onNextButton}>계좌 인증</button>
        </ContainerDiv>
    );
}

export default SignupAccount;