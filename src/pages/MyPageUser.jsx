import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import BASE_URL from '../config';

function MyPage() {
    const navigate = useNavigate();
    const [data, setData] = useState('');

    // const temp_URL = 'https://db4d417c-9e4a-46b3-bd45-9245a9d99984.mock.pstmn.io/api';

    useEffect(() => {
        async function fetchData() {
            try {
                const REST_API_URL = `${BASE_URL}/userinfo`;

                const response = await fetch(REST_API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'userId': localStorage.getItem('userId')
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const datas = await response.json();
                setData(datas.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const onModClick = () => {
        navigate('/mypage/mod', {
            state: data
        });
    }

    const onWithdrawClick = () => {
        navigate('/mypage/withdraw');
    }


    return (
        <ContainerDiv>
            <h1>My Page</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>이름</TitleDiv>
                    <TextDiv>{data.userName}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>ID</TitleDiv>
                    <TextDiv>{data.userId}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>생년월일</TitleDiv>
                    <TextDiv>{data.birth}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>핸드폰</TitleDiv>
                    <TextDiv>{data.phone}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>Email</TitleDiv>
                    <TextDiv>{data.email}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>계좌 번호</TitleDiv>
                    <TextDiv>{data.accountNum}</TextDiv>
                </ContentsDiv>
            </WrapperDiv>

            <div>
                <button onClick={onModClick}>수정하기</button>
                <button onClick={onWithdrawClick}>탈퇴하기</button>
            </div>

        </ContainerDiv>
    );
}

export default MyPage;
