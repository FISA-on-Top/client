import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv, NavContainedButton} from '../styled/StyledContents';
import styled from 'styled-components';
import BASE_URL from '../config';

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

function MyPage() {
    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const API_URL = `${BASE_URL}/userinfo`;

                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'userId': localStorage.getItem('userId')
                    }
                });

                if (!response.ok) {
                    throw new Error('User Info Request failed');
                }

                const datas = await response.json();

                if (datas.resultCode !== '0000') {
                    alert(datas.data);
                    return;
                }

                setData(datas.data);

            } catch (error) {
                console.error('Error:', error);
                alert("잠시 후 다시 시도해 주세요");
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
