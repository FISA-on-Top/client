import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const LogginDiv = styled.div`
    display: flex;
    align: column;
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

    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

        const fetchEvents = async () => {
            try {
                const response = await fetch('./login.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const eventData = await response.json();

                // 비교하여 로그인 성공 여부 판단
                const isValidLogin = eventData[0].userId === id && eventData[0].userPw === pw;
                
                // 로그인 성공 시, '/' 경로로 이동
                if (isValidLogin) {
                    onLogin();
                    navigate(`/${currentNav}`);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        const handleLoginClick = () => {
            fetchEvents();
        }

    return (
        <LogginDiv>
            <HelpTextDiv>
                <p>아이디:</p>
                <p>비밀번호:</p>
            </HelpTextDiv>
            <TextInputDiv>
                <textarea
                    value={id}
                    onChange={(event) => {
                        setId(event.target.value);
                    }}
                />
                <textarea
                    value={pw}
                    onChange={(event) => {
                        setPw(event.target.value);
                    }}
                />
            </TextInputDiv>

                <button onClick={handleLoginClick}>로그인</button>
            
        </LogginDiv>
    );
}

export default LoginPage;
