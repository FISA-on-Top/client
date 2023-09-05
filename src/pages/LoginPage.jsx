import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const LogginDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: grey;
`;

const HelpTextDiv = styled.div`
    background-color: white;
    margin: 8px;
    object-fit: contain;
`;

const TextInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: yellow;
    margin: 8px;
`;

function LoginPage({ isLoggedIn, onLogin, currentNav }) {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

        const fetchEvents = async () => {
            try {
                const response = await fetch(`https://ab958cb0-795c-48a3-bb44-2534a1b0784b.mock.pstmn.io/loginauth`, {
                    method: 'GET',
                    headers: {
                        'userId': id,
                        'userPw': pw,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to login');
                }

                const datas = await response.json();
                
                if (datas.resultCode === '0000') {
                    localStorage.setItem("userId", id);
                    onLogin();
                    navigate(`/${currentNav}`);
                }
                
            } catch (error) {
                console.error('Error fetching events:', error);
                alert('다시 시도해주세요');
            }
        };

        const handleLoginClick = () => {
            fetchEvents();
        }

        const handleSignUpClick = () => {
            navigate('/signupAccount');
        }

    return (
        <LogginDiv>
            <HelpTextDiv>
                <p>아이디:</p>
                <p>비밀번호:</p>
            </HelpTextDiv>
            <TextInputDiv>
                <input
                    value={id}
                    onChange={(event) => {
                        setId(event.target.value);
                    }}
                />
                <input
                    value={pw}
                    onChange={(event) => {
                        setPw(event.target.value);
                    }}
                />
                <button onClick={handleSignUpClick}>회원가입</button>
            </TextInputDiv>
                <button onClick={handleLoginClick}>로그인</button>
        </LogginDiv>
    );
}

export default LoginPage;
