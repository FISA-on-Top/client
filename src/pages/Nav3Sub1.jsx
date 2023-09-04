import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';

function Nav3Sub1() {
    const [inputValue, setInputValue] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const fetchAccount = async () => {
        try {
            const response = await fetch(`https://5674dead-9b15-43f4-9eb4-21debfa1c2be.mock.pstmn.io/orders/cancel`, {
                method: 'GET',
                header: {
                    // 'Content-Type': 'application/json',
                    'accountNum': location.state.userAccount,
                    'accountPw': inputValue
                }
            });

            if (!response.ok) {
                throw new Error('Account response was not ok');
            }

            const datas = await response.json();
            if (datas.resultCode === '1001') {
                setPasswordError(datas.resultMessage);
            }
            setPasswordError('');
        } catch (error) {
            console.error('Error fetching the data', error);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const onReturnClick = () => {
        navigate(-1);
    }

    const onSubmitClick = () => {
        if (passwordError === '') {
            navigate('/nav3/sub2', {
                state: {
                    userAccount: location.state.userAccount,
                    row: location.state.row
                }
            });
        }
    }

    return (
        <div>
            <ContainerDiv>
                <h1>청약 취소</h1>
                <WrapperDiv>
                    <ContentsDiv>
                        <TitleDiv>
                            청약계좌
                        </TitleDiv>
                        <TextDiv>
                            {location.state.userAccount}
                        </TextDiv>
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>
                            계좌 비밀번호
                        </TitleDiv>
                        <TextDiv>
                            <input
                                type="text"
                                value={inputValue} // 상태의 값과 input 값을 연결
                                onChange={handleInputChange} // 입력값이 변경될 때 호출됨
                            />
                        </TextDiv>
                    </ContentsDiv>
                </WrapperDiv>

                <WrapperDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 번호</TitleDiv>
                        <TextDiv>{location.state.row.corpCode}</TextDiv>
                        <TitleDiv>청약 종목명</TitleDiv>
                        <TextDiv>{location.state.row.corpName}</TextDiv>
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 상태</TitleDiv>
                        <TextDiv>{location.state.row.orderStatus}</TextDiv>
                        <TitleDiv>청약 수량</TitleDiv>
                        <TextDiv>{location.state.row.orderAmount}</TextDiv>
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 구분</TitleDiv>
                        <TextDiv>{location.state.row.subscriptionClassification}</TextDiv>
                        <TitleDiv>청약 증거금</TitleDiv>
                        <TextDiv>{location.state.row.deposit}</TextDiv>
                    </ContentsDiv>
                </WrapperDiv>
                <div>
                    <button onClick={onReturnClick}>이전</button>
                    <button onClick={onSubmitClick}>확인</button>
                </div>
            </ContainerDiv>
            <div>
                {passwordError &&
                    <div>
                        <p style={{ color: 'red', textAlign: 'center' }}>
                            {passwordError}
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Nav3Sub1;
