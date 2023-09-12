import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import BASE_URL from "../config";


function SignupId() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userPwConfirm, setUserPwConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [isIdValid, setIsIdValid] = useState(true);

    const checkDuplication = async () => {
        try {
            const response = await fetch(`${BASE_URL}/signup/check`, {
                method: 'GET',
                headers: {
                    'userId': userId
                }
            });

            if (!response.ok) {
                throw new Error('Check Duplication Request failed');
            }

            const data = response.json();

            if (data.resultCode !== '0000') {
                alert(data.data);
                return;
            }

        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    }

    const fetchRegisterUser = async () => {
        try {
            const response = await fetch(`${BASE_URL}/signup/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "userId": userId,
                    "userPw": userPw,
                    "email": email,
                    "phoneNum": phoneNum,
                    "accountNum": location.state.accountNum
                })
            });

            if (!response.ok) {
                throw new Error('Register User Request failed');
            }

            const data = await response.json();

            if (data.resultCode !== '0000') {
                alert(data.data);
                return;
            }

            navigate('/login');

        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    }

    const handleCheckDuplicateClick = () => {
        checkDuplication();

        if (userId.length < 5) {
            setIsIdValid(true);
            alert('ID는 5자 이상이어야 합니다.');
        } else {
            setIsIdValid(false);
            alert('사용 가능한 ID입니다.');
        }
    };

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
        setIsIdValid(true);
    };

    const validateEmail = (email) => {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        let regex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
        return regex.test(phone);
    };

    const onNextButton = () => {
        if (isIdValid) {
            alert('ID 중복 확인을 해주세요.');
            return;
        }

        if (userPw !== userPwConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!validateEmail(email)) {
            alert('이메일 주소가 올바르지 않습니다.');
            return;
        }

        if (!validatePhoneNumber(phoneNum)) {
            alert('전화번호 형식이 잘못되었습니다. xxx-xxxx-xxxx 형식으로 입력해주세요.');
            return;
        }

        fetchRegisterUser();
    }

    return (
        <ContainerDiv>
            <h1>Sign up</h1>
            <WrapperDiv>
            <ContentsDiv style={{
                    display: 'flex',
                    justifyContent: 'space-between',  // Split contents evenly
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',  // Center horizontally
                        textAlign: 'center',  // Center text
                        margin: '0 10px',
                    }}>
                        <img style={{ width: '200px' }} src="/img/signup_2_1.png" alt="Step 1" />
                        회원가입 1단계
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',  // Center horizontally
                        textAlign: 'center',  // Center text
                        margin: '0 10px',
                    }}>
                        <img style={{ width: '200px' }} src="/img/signup_2_2.png" alt="Step 2" />
                        회원가입 2단계
                    </div>
                </ContentsDiv>
            </WrapperDiv>

            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>이름</TitleDiv>
                    <TextDiv>
                        {location.state.name}
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>ID입력</TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={userId}
                            onChange={handleUserIdChange}
                            className={!isIdValid ? "invalid" : ""}
                        />
                        <button onClick={handleCheckDuplicateClick}>중복확인</button>
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>PW입력</TitleDiv>
                    <TextDiv>
                        <input
                            type="password"
                            value={userPw}
                            onChange={(e) => setUserPw(e.target.value)}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>PW확인</TitleDiv>
                    <TextDiv>
                        <input
                            type="password"
                            value={userPwConfirm}
                            onChange={(e) => setUserPwConfirm(e.target.value)}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>Email</TitleDiv>
                    <TextDiv>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>전화번호</TitleDiv>
                    <TextDiv>
                        <input
                            type="tel"
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                        />
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <button onClick={onNextButton}>등록</button>
        </ContainerDiv>
    );
}

export default SignupId;