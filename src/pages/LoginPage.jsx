import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isAdminAtom, userIdInfo, userLoggedIn } from '../state/state';
import BASE_URL from '../config';

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
