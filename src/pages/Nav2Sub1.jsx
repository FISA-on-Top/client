import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import CustomSelect from '../components/CustomSelect';

function Nav2Sub1() {
    const navigate = useNavigate();
    const { ipoId } = useParams();
    const [isAccountVisible, setIsAccountVisible] = useState(false);
    const [accountNum, setAccountNum] = useState('');
    const [accountPassword, setAccountPassword] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [subscriptionData,setSubsriptionData] = useState(''); 
    const [subscriptionAvailableQuantity, setAvailableQuantity] = useState(''); //청약 가능 금액
    const [subscriptionGrade, setSubscriptionGrade] = useState(''); // 청약등급
    const [subscriptionCommission , setSubscriptionCommission] =useState(''); //청약 수수료
    const [subscriptionAvailableAmount, setSubscriptionAvailableAmount] = useState(''); //청약 가능 수량
    const [subscriptionQuantity, setSubscriptionQuantity] = useState(''); // 청약 수량
    const [subscriptionPrice, setSubscriptionPrice] = useState(''); //공모가(확정발행가)
    const [subscriptionDeposit, setSubscriptionDeposit] =useState(''); //청약증거금
    const [phoneNum, setPhoneNum] = useState(''); //연락처
    const [phoneError, setPhoneError] = useState('');

    useEffect(() => {
        // 임시로 localStorage에 사용자 정보 및 계좌 리스트 저장
        localStorage.setItem("userId", "user01");
        //localStorage.setItem("user_account", "1234-1234");
        //localStorage.setItem("user_name", "홍길동");
        //localStorage.setItem('accounts', JSON.stringify(['1234-1234', '3456-3456', '5678-5678']));
        //console.log(localStorage.getItem('accounts'));
        // 서버로부터 비동기

        const fetchEvents = async () => {
            // REST API의 URL
            const apiUrl = 'https://49c63d20-10d7-40ca-bf3a-0be4bf52acfa.mock.pstmn.io/api/orders/account';            
            // localStorage에서 userId 정보를 가져옵니다.
            const userId = localStorage.getItem('userId');
            
            if(userId){
                try{
                    const response = await fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          'userId': userId  // 이 부분에서 헤더에 userId 정보를 추가합니다.
                        },
                      });

                    const accountJson = await response.json();
                    console.log(accountJson); 

                    if(accountJson.resultCode === "0000") {
                        console.log(accountJson.data.accountNum);
                        setAccountNum(accountJson.data.accountNum);
                        localStorage.setItem("accountNum", accountJson.data.accountNum);
                    }else {
                        console.error('Error retrieving data:', accountJson.resultMessage);
                    }
                } catch(error){
                    console.error("Error fetching the data", error);
                }
            }
            else{
                alert("로그아웃 상태입니다")
            }
        };

        fetchEvents();        
    }, []);

    const handleSubmit = async () => {
        // REST API의 URL
        const apiUrl = 'https://49c63d20-10d7-40ca-bf3a-0be4bf52acfa.mock.pstmn.io/api/orders/account/verify';     

        try{
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'accountNum': accountNum,
                  'accountPw' : accountPassword
                },
              });

            const subscriptionJson  = await response.json();
            console.log(subscriptionJson); 

            if(subscriptionJson.resultCode === "0000") {   
                setSubsriptionData(subscriptionJson.data);
            }else {
                console.error('Error retrieving data:', subscriptionJson.resultMessage);
            }
        } catch(error){
            console.error("Error fetching the data", error);
        }
    };

    const handlePhoneNum = (event) => {      
        setPhoneNum(event.target.value);
    };

    const onBackClick = () => {
        navigate(-1);
    }

    const onNextClick = () => {
        const phoneRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;  
        console.log(phoneRegex.test(phoneNum));        
        if (!phoneRegex.test(phoneNum)){
            setPhoneError("연락처를 다시 확인해 주세요.");
        }else{
            setPhoneError('');
            navigate(`/nav2/sub2`); 
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
                            {accountNum}
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
                        <TextDiv> {subscriptionData && subscriptionData.balance ? subscriptionData.balance: ""}</TextDiv>
                        <TitleDiv>청약 등급</TitleDiv>
                        <TextDiv>{subscriptionData && subscriptionData.grade ? subscriptionData.grade:""}</TextDiv>                        
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 수수료</TitleDiv>
                        <TextDiv>{subscriptionData && subscriptionData.commission ? subscriptionData.commission : ""}</TextDiv>
                        <TitleDiv>청약 가능 수량</TitleDiv>
                        <TextDiv>{subscriptionData && subscriptionData.orderableAmount ? subscriptionData.orderableAmount: ""}</TextDiv>                        
                    </ContentsDiv>                    
                </WrapperDiv>
            </ContainerDiv>

            <ContainerDiv>
                <h1>청약정보 입력</h1>
                <WrapperDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 수량</TitleDiv>
                        <TextDiv>
                        <CustomSelect onOptionChange={option => setSubscriptionQuantity(option)} />
                        </TextDiv>
                        <TitleDiv>공모가(확정발행가)</TitleDiv>
                        <TextDiv>{subscriptionData && subscriptionData.slprc ? subscriptionData.slprc:""}</TextDiv>
                    </ContentsDiv>

                    <ContentsDiv>
                        <TitleDiv>청약 증거금</TitleDiv>
                        <TextDiv>{subscriptionDeposit}</TextDiv>
                        <TitleDiv>연락처</TitleDiv>
                        <TextDiv>
                        <input
                                type="text"
                                value={phoneNum}
                                placeholder="연락처를 입력하세요."
                                style={{ display: 'inline-block', marginRight: '4px' }}
                                //onChange={(e) => setPhoneNum(e.target.value)
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
                        <button onClick={onBackClick}>이전</button>
                        <button onClick={onNextClick}>다음</button> 
                    </div>
                    <div>
                        {phoneError && 
                        <div>
                            <p style={{ color: 'red', textAlign: 'center' }}>
                            {phoneError}
                            </p>
                        </div>}
                    </div>
                </WrapperDiv>
            </ContainerDiv >

        </div >
    );
}

export default Nav2Sub1;
