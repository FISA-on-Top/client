import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Button, SmallEmptyButton } from '../styled/StyledContents';
import { isAdminAtom, userIdInfo, userLoggedIn } from '../state/state';
import BASE_URL from '../config';

const LoginContainer = styled.div`
  display: flex;
  margin : 5rem auto;
  justify-content: center;
  align-items: center;
  height: flex;
  background-color: #f4f4f4;
  font-family: 'Inter', sans-serif;
`;
const LoginBox = styled.div`
  width: 300px;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h1`
  font-size: 24px;
  color: #2B64CE;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 92%;
  padding: 10px;
  margin: 0.5rem auto; // 위아래 간격은 2rem으로, 좌우 중앙 정렬을 위해 auto 사용
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: 'Inter', sans-serif;
  display: block; // input이 block 요소로 표시되도록 설정
`;

function LoginPage({ currentNav }) {
    const navigate = useNavigate();
    const setIsLoggedIn = useSetRecoilState(userLoggedIn);
    const setUserId = useSetRecoilState(userIdInfo);
    const setIsAdmin = useSetRecoilState(isAdminAtom);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const fetchLoginAuth = async () => {
        try {
            const response = await fetch(`${BASE_URL}/loginauth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: id,
                    userPw: pw,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const datas = await response.json();

            if (datas.resultCode !== '0000') {
                alert(datas.data);
                return;
            }
            
            localStorage.setItem("userId", id);
            setUserId(id);
            setIsLoggedIn(true);
            
            if (localStorage.getItem("userId") === 'admin') {
                setIsAdmin(true);
                setId('');
                navigate('/adminPage');
            } else {
                // setIsAdmin(false);
                // navigate('/');
                setId('');
                navigate(`/${currentNav}`);
            }

        } catch (error) {
            console.error('Error fetching events:', error);
            alert('다시 시도해주세요');
        }
    };

    const handleLoginClick = () => {
        fetchLoginAuth();
    }

    const handleSignUpClick = () => {
        navigate('/signupAccount');
    }

    return (
        <LoginContainer>
            <LoginBox>
                <Title>Login</Title>
                <Input
                    type= "text"
                    placeholder="아이디 입력"
                    value={id}
                    onChange={(event) => {
                        setId(event.target.value);
                    }}
                />
                <Input
                    type="password"
                    placeholder='비밀번호 입력'
                    value={pw}
                    onChange={(event) => {
                        setPw(event.target.value);
                    }}
                />
                <Button onClick={handleLoginClick}>Login</Button>
                <SmallEmptyButton style={{'font-size':'0.5 rem'}}onClick={handleSignUpClick}>회원가입</SmallEmptyButton>
            </LoginBox>
        </LoginContainer>

    );
}

export default LoginPage;
