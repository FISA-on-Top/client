import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv, NavContainedButton} from '../styled/StyledContents';
import styled from 'styled-components';
import BASE_URL from '../config';

const ButtonDiv = styled.div`
  display: flex; // flex display를 활성화하여 버튼들을 일렬로 정렬합니다.
  flex-direction: row; // 버튼들을 수평으로 정렬합니다.
  gap: 8px; // 버튼 사이의 간격을 설정합니다.
`;

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
                    <TextDiv>{data.phoneNum}</TextDiv>
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

            <ButtonDiv>
                <NavContainedButton onClick={onModClick}>수정하기</NavContainedButton>
                <NavContainedButton onClick={onWithdrawClick}>탈퇴하기</NavContainedButton>
            </ButtonDiv>

        </ContainerDiv>
    );
}

export default MyPage;
