import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';

function Nav2Sub1() {
    const navigate = useNavigate();
    const { ipoId } = useParams();
    const [isAccountVisible, setIsAccountVisible] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [accountPassword, setAccountPassword] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [subscriptionAmount, setSubscriptionAmount] = useState('');
    const [subscriptionQuantity, setSubscriptionQuantity] = useState('');
    const [availableAmount, setAvailableAmount] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');

    const accounts = JSON.parse(localStorage.getItem('accounts'));

    useEffect(() => {
        // 임시로 localStorage에 사용자 정보 및 계좌 리스트 저장
        localStorage.setItem("user_id", "1111");
        localStorage.setItem("user_account", "1234-1234");
        localStorage.setItem("user_name", "홍길동");
        localStorage.setItem('accounts', JSON.stringify(['1234-1234', '3456-3456', '5678-5678']));
        console.log(localStorage.getItem('accounts'));
        // 서버로부터 비동기
    }, []);

    const handleSubmit = async () => {
        // 비동기 rest api 호출
        // const response = await sendDataToServer(accountNumber, isAccountVisible, accountPassword);
        // const data = await response.json();
    };

    const onBackClick = () => {
        navigate(-1);
    }

    const onNextClick = () => {
        navigate(`/nav2/sub2`);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <ContainerDiv>
                <h1>청약계좌 선택</h1>
                <WrapperDiv>
                    <ContentsDiv>
                        <TitleDiv>계좌 번호</TitleDiv>
                        <TextDiv>
                            {accounts}
                        </TextDiv>
                        <TitleDiv>계좌 비밀번호</TitleDiv>
                        <TextDiv>
                            <input
                                type="password"
                                value={accountPassword}
                                style={{ display: 'inline-block', marginRight: '4px' }}
                                onChange={(e) => setAccountPassword(e.target.value)}
                            />
                            <button style={{ display: 'inline-block' }} onClick={handleSubmit}>확인</button>
                        </TextDiv>
                    </ContentsDiv>

                    <ContentsDiv>
                        <TitleDiv>청약 가능 금액</TitleDiv>
                        <TextDiv>확인 후 받아오고</TextDiv>
                        <TitleDiv>청약 수수료</TitleDiv>
                        <TextDiv>2000원임? 받아옴?</TextDiv>
                    </ContentsDiv>
                </WrapperDiv>
            </ContainerDiv>

            <ContainerDiv>
                <h1>청약정보 입력</h1>
                <WrapperDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 수량</TitleDiv>
                        <TextDiv>toggle 수량</TextDiv>
                        <TitleDiv>공모가</TitleDiv>
                        <TextDiv>받아옴?</TextDiv>
                    </ContentsDiv>

                    <ContentsDiv>
                        <TitleDiv>청약 증거금</TitleDiv>
                        <TextDiv>받아와?</TextDiv>
                        <TitleDiv>연락처</TitleDiv>
                        <TextDiv>전화번호 입력</TextDiv>
                    </ContentsDiv>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '10px'
                    }}>
                        <button onClick={onBackClick}>이전</button>
                        <button onClick={onNextClick}>다음</button>
                    </div>
                </WrapperDiv>
            </ContainerDiv >

        </div >
    );
}

export default Nav2Sub1;
