import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv, StyledInput } from '../styled/StyledContents';
import CustomSelect from '../components/CustomSelect';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accountNumber, phoneNumber, commissionPrice, orderAmount, deposit, selectedIpo } from '../state/stateForNav2.js';
import BASE_URL from '../config';

function Nav2Sub1() {
    const navigate = useNavigate();
    const [isAccountVisible, setIsAccountVisible] = useState(false);
    const [accountPassword, setAccountPassword] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [subscriptionData, setSubsriptionData] = useState('');

    const [balance, setBalance] = useState(''); //청약 가능 금액
    //const [Grade, setGrade] = useState(''); // 청약등급 -> 고정 값
    const [subscriptionAvailableAmount, setSubscriptionAvailableAmount] = useState(''); //청약 가능 수량
    const [subscriptionPrice, setSubscriptionPrice] = useState(''); //공모가(확정발행가)
    const [selectedDepositError, setSelectedDepositError] = useState('');
    const [selectedAmount, setSelectedAmount] = useRecoilState(orderAmount); // 청약 수량
    const [selectedDeposit, setSelectedDeposit] = useRecoilState(deposit); //청약증거금

    const [accountNum, setAccountNum] = useRecoilState(accountNumber);//계좌번호 
    const commission = useRecoilValue(commissionPrice);  //수수료 -> 고정값 2000
    const [phoneNum, setPhoneNum] = useRecoilState(phoneNumber);//연락처

    const [subscriptionAmountSelect, setSubscriptionAmountSelect] = useState([]); //청약 수량 select 배열
    const ipoId = useRecoilValue(selectedIpo);

    const Options = [
        { value: 'select..', label: '계좌 인증 필요', isDisabled: true },
    ];

    useEffect(() => {
        // 서버로부터 비동기
        const fetchEvents = async () => {
            // REST API의 URL
            const apiUrl = `${BASE_URL}/orders/account`;
            // localStorage에서 userId 정보를 가져옵니다.
            const userId = localStorage.getItem('userId');

            if (userId) {
                try {
                    const response = await fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                            'userId': userId
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Orders Account Resquest failed');
                    }

                    const accountJson = await response.json();

                    if (accountJson.resultCode !== '0000') {
                        alert(accountJson.data);
                        return;
                    }

                    if (accountJson.resultCode === "0000") {
                        //계좌 정보 초기 설정
                        setAccountNum(accountJson.data.accountNum);

                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert("잠시 후 다시 시도해 주세요");
                }
            }
            else {
                alert("로그아웃 상태입니다")
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {

            //청약 수량 select 만들기
            if (subscriptionAvailableAmount > 0) {
                await updateSubscriptionAmountSelect(subscriptionAvailableAmount);
            }
        };

        const updateSubscriptionAmountSelect = async (numericAmount) => {
            const newOptions = [];

            for (let i = 10; i <= numericAmount; i += 10) {
                newOptions.push({ value: i.toString(), label: i.toString() });
            }

            setSubscriptionAmountSelect(prevOptions => [...newOptions]);
        }

        fetchEvents();
    }, [subscriptionAvailableAmount]);

    useEffect(() => {
        const fetchEvents = async () => {
            //청약 증거금 계산하기
            if (selectedAmount.length > 0) {
                await updateSelectedDeposit();
            }

        };

        const updateSelectedDeposit = async () => {
            const commissionNum = Number(commission.replace(/,/g, '')) //수수료
            const grade = 0.5; // 할인율 50% 할인;
            //const price = parseFloat(subscriptionPrice.replace(/,/g,'')); //공모가
            const price = subscriptionPrice;
            const amount = Number(selectedAmount); //청약 수량

            // (수수료*할인율) + (공모가*청약수량)
            let result = (commissionNum * grade) + (price * amount);


            result = Math.round(result * 100) / 100;  // 소수점 둘째자리에서 반올림
            const resultStr = result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 결과값을 돈 형식(콤마 형식)의 문자열로 변환
            //const balanceNum =parseFloat(balance.replace(/,/g,''));
            const balanceNum = balance;

            if (result > balanceNum) {
                setSelectedDeposit('');
                setSelectedDepositError(resultStr + ' (금액 초과)');
            } else {
                setSelectedDeposit(resultStr);
                setSelectedDepositError('');
            }
        }

        fetchEvents();
    }, [selectedAmount]);

    const handleSubmit = async () => {
        const apiUrl = `${BASE_URL}/orders/account/verify`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // Convert the data to JSON format
                    'accountNum': accountNum,
                    'accountPw': accountPassword,
                    'ipoId': ipoId
                }),
            });

            if (!response.ok) {
                throw new Error('Handle Submit Request failed');
            }

            const subscriptionJson = await response.json();

            if (subscriptionJson.resultCode !== '0000') {
                alert(subscriptionJson.data);
                return;
            }

            if (subscriptionJson.resultCode === "0000") {
                setSubsriptionData(subscriptionJson.data);
                setSubscriptionAvailableAmount(subscriptionJson.data.orderableAmount);
                setSubscriptionPrice(subscriptionJson.data.slprc);
                setBalance(subscriptionJson.data.balance);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    };

    const handlePhoneNum = (event) => {
        setPhoneNum(phoneNumber);
    };

    const onPreClick = () => {
        navigate(-1);
    }

    const onNextClick = () => {
        let verify = true;

        //연락처 유효성 검증
        const phoneRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;

        if (!phoneNum) {
            alert("연락처를 입력해 주세요.");
        } else if (!phoneRegex.test(phoneNum)) {
            alert("연락처를 다시 확인해 주세요.");
            verify = false;
        }

        //증거금 유효성 검증
        if (selectedDeposit.length <= 0) {
            setSelectedDepositError("청약 수량을 다시 선택하세요.");
            verify = false;
        } else {
            setSelectedDepositError("");
        }

        if (verify) {
            navigate(`/nav2/sub2`,);
        }
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
                            {accountNum ? accountNum : ""}
                        </TextDiv>
                        <TitleDiv>계좌 비밀번호</TitleDiv>
                        <TextDiv>
                            <input
                                type="password"
                                placeholder="비밀번호 입력"
                                value={accountPassword}
                                style={{ display: 'inline-block', flex: '1', marginRight: '4px', width: '50px', border: 'none', outline: 'none', background: 'transparent' }}
                                onChange={(e) => setAccountPassword(e.target.value)}
                            />
                            <button style={{ display: 'inline-block' }} onClick={handleSubmit}>확인</button>
                        </TextDiv>
                    </ContentsDiv>

                    <ContentsDiv>
                        <TitleDiv>청약 가능 금액</TitleDiv>
                        <TextDiv> {subscriptionData && subscriptionData.balance ? subscriptionData.balance : ""}</TextDiv>
                        <TitleDiv>청약 등급</TitleDiv>
                        <TextDiv>{subscriptionData ? "온라인/50%" : ""}</TextDiv>
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 수수료</TitleDiv>
                        <TextDiv>{subscriptionData ? "2,000" : ""}</TextDiv>
                        <TitleDiv>청약 가능 수량</TitleDiv>
                        <TextDiv>{subscriptionData && subscriptionData.orderableAmount ? subscriptionData.orderableAmount : ""}</TextDiv>
                    </ContentsDiv>
                </WrapperDiv>
            </ContainerDiv>

            <ContainerDiv>
                <h1>청약정보 입력</h1>
                <WrapperDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 수량</TitleDiv>
                        <TextDiv>
                            {(e) => setAccountPassword(e.target.value)}
                            <CustomSelect options={subscriptionAmountSelect.length > 0 ? subscriptionAmountSelect : Options} onOptionChange={e => setSelectedAmount(e.value)} />
                        </TextDiv>
                        <TitleDiv>공모가(확정발행가)</TitleDiv>
                        <TextDiv>{subscriptionData && subscriptionData.slprc ? subscriptionData.slprc : ""}</TextDiv>
                    </ContentsDiv>

                    <ContentsDiv>
                        <TitleDiv>청약 증거금</TitleDiv>
                        <TextDiv>{subscriptionData ?
                            (selectedDepositError && selectedDepositError.length > 0
                                ? <span style={{ color: 'red' }}>{selectedDepositError}</span>
                                : <span style={{ color: 'black' }}>{selectedDeposit}</span>) : ""}</TextDiv>
                        <TitleDiv>연락처</TitleDiv>
                        <TextDiv>
                            <StyledInput
                                type="text"
                                placeholder="010-xxxx-xxxx"
                                value={phoneNum}
                                onChange={handlePhoneNum}
                            />
                        </TextDiv>
                    </ContentsDiv>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '10px'
                    }}>
                        <button onClick={onPreClick}>이전</button>
                        <button onClick={onNextClick}>다음</button>
                    </div>
                </WrapperDiv>
            </ContainerDiv >

        </div >
    );
}

export default Nav2Sub1;
