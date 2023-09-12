import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import BASE_URL from "../config";

function SignupAccount() {
    const navigate = useNavigate();
    const [accountNum, setAccountNum] = useState();
    const [accountPw, setAccountPw] = useState();
    const [birthDay, setBirthDay] = useState();

    const fetchSignupAccount = async () => {
        try {
            const response = await fetch(`${BASE_URL}/signup/account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "accountNum": accountNum,
                    "accountPw": accountPw,
                    "birth": birthDay
                })
            });

            if (!response.ok) {
                throw new Error('Signup Account Request failed');
            }

            const data = await response.json();

            if (data.resultCode !== '0000') {
                alert(data.data);
                return;
            }

            navigate('/signupId', {
                state: {
                    name: data.data.name,
                    accountNum: accountNum
                }
            });

        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    }

    const handleAccountNumChange = (event) => {
        setAccountNum(event.target.value);
    };

    const handleAccountPwChange = (event) => {
        setAccountPw(event.target.value);
    };

    const handleBirthDayChange = (event) => {
        setBirthDay(event.target.value);
    }

    const validateAccountNumber = (accountNum) => {
        const regex = /^[0-9]+$/;
        return regex.test(accountNum);
    };

    const validateBirthDate = (date) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    };

    const onNextButton = () => {
        if (!validateAccountNumber(accountNum)) {
            alert('계좌 형식이 잘못되었습니다./n - 없이 입력해주세요.');
            return;
        }

        if (!validateBirthDate(birthDay)) {
            alert('생년월일 형식이 잘못되었습니다./n xxxx-xx-xx 형식으로 입력해주세요.');
            return;
        }

        fetchSignupAccount();
    }

    return (
        <ContainerDiv>
            <h1>Sign up</h1>
            <WrapperDiv>
                <ContentsDiv style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        margin: '0 10px',
                    }}>
                        <img style={{ width: '200px' }} src="/img/signup_1_1.png" alt="Step 1" />
                        회원가입 1단계
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        margin: '0 10px',
                    }}>
                        <img style={{ width: '200px' }} src="/img/signup_1_2.png" alt="Step 2" />
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