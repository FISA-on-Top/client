import React, { useState } from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import { useLocation, useNavigate } from 'react-router';
import BASE_URL from '../config';

function MyPageMod() {
    const navigater = useNavigate();
    const location = useLocation();
    const [datas, setDatas] = useState('');
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        userPw: ''
    });

    const fetchMod = async () => {
        const apiUrl = `${BASE_URL}/userinfo/modify`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'userId': localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    email: formData.email,
                    phoneNum: formData.phone,
                    userPw: formData.userPw,
                })
            });

            if (!response.ok) {
                throw new Error('User Info Modify Request failed');
            }

            const data = await response.json();

            if (data.resultCode !== '0000') {
                alert(data.data);
                return;
            }

            setDatas(data.data);

            if (data.resultCode === '0000') {
                navigater(-1);
            }

        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    };

    const onModClick = () => {
        fetchMod();
    }

    return (
        <ContainerDiv>
            <h1>My Page</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>이름</TitleDiv>
                    <TextDiv>{location.state.userName}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>ID</TitleDiv>
                    <TextDiv>{location.state.userId}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>생년월일</TitleDiv>
                    <TextDiv>{location.state.birth}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>핸드폰</TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>Email</TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>계좌 번호</TitleDiv>
                    <TextDiv>{location.state.accountNum}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>비밀 번호</TitleDiv>
                    <TextDiv>
                        <input
                            type="password"
                            value={formData.userPw}
                            onChange={(e) => setFormData({ ...formData, userPw: e.target.value })}
                        />
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <div>
                <button onClick={onModClick}>수정하기</button>
            </div>
        </ContainerDiv>
    );
}

export default MyPageMod;
