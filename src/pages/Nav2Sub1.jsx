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

    const [balance, setBalance] = useState(''); //청약 가능 금액
    //const [Grade, setGrade] = useState(''); // 청약등급 -> 고정 값
    //const [Commission , setSubscriptionCommission] = useState(''); //청약 수수료 -> 고정 값
    const [subscriptionAvailableAmount, setSubscriptionAvailableAmount] = useState(''); //청약 가능 수량
    const [subscriptionPrice, setSubscriptionPrice] = useState(''); //공모가(확정발행가)
    const [selectedAmount, setSelectedAmount] = useState(''); // 청약 수량
    const [selectedDeposit, setSelectedDeposit] = useState(''); //청약증거금
    const [selectedDepositError, setSelectedDepositError] = useState(''); 
    const [phoneNum, setPhoneNum] = useState(''); //연락처
    const [phoneError, setPhoneError] = useState('');

    const [subscriptionAmountSelect, setSubscriptionAmountSelect] = useState([]); //청약 수량 select 배열

    const Options =[
        { value: 'select..', label: '계좌 인증 필요', isDisabled: true},
    ];
    
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

                        //계좌 정보 초기 설정
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

    useEffect(() => {
        const fetchEvents = async () => {
            //청약 수량 select 만들기
            await updateSubscriptionAmountSelect(subscriptionAvailableAmount);
        };

        const updateSubscriptionAmountSelect = async (orderableAmount) => {
            let numericAmount = Number(orderableAmount);
            const newOptions = [];
            let division = 1;
            let divisionSize = 1;
    
            while (numericAmount >= division){
                newOptions.push({ value: numericAmount.toString(), label: numericAmount.toString() });
                division = division*(10*divisionSize);
                numericAmount = Math.floor(numericAmount / division);
                divisionSize ++;
            }
            // 100 미만의 값을 추가합니다.
            console.log('100 미만의 값을 추가합니다.'+ numericAmount)
            if (numericAmount >= 10) {
                newOptions.push({ value: numericAmount.toString(), label: numericAmount.toString()});
            }else{
               // 최소 수량은 10입니다.
                newOptions.push({ value:"10", label: "10"}); 
            }
            setSubscriptionAmountSelect(prevOptions => [...newOptions]);
        }
        fetchEvents();        
    }, [subscriptionAvailableAmount]);

    useEffect(() => {
        const fetchEvents = async () => {
            //청약 증거금 계산하기
            if(selectedAmount.length > 0)
            {
                await updateSelectedDeposit();
            }
            
        };

        const updateSelectedDeposit = async () => {
            const commission = 2000; //수수료
            const grade = 0.5; // 할인율 50% 할인;
            const price = parseFloat(subscriptionPrice.replace(/,/g,'')); //공모가
            const amount = Number(selectedAmount); //청약 수량
    
            // (수수료*할인율) + (공모가*청약수량)
            console.log('price :'+ price)
            console.log('amount :'+ amount)
            let result = (commission * grade) + (price * amount);
    
           
            result = Math.round(result * 100) / 100;  // 소수점 둘째자리에서 반올림
            const resultStr = result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 결과값을 돈 형식(콤마 형식)의 문자열로 변환
            const balanceNum =parseFloat(balance.replace(/,/g,''));

            if(result > balanceNum){
                setSelectedDeposit('');
                setSelectedDepositError(resultStr+' (금액 초과)');
            }else{
                setSelectedDeposit(resultStr);
                setSelectedDepositError('');
            }
            
            console.log('여기 오나요/ : ' + selectedAmount)
        }

        fetchEvents();        
    }, [selectedAmount]);

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
                setSubscriptionAvailableAmount(subscriptionJson.data.orderableAmount);
                setSubscriptionPrice(subscriptionJson.data.slprc);
                setBalance(subscriptionJson.data.balance);
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

    const onNextClick = () => {
        let verify = true;

        //연락처 유효성 검증
        const phoneRegex = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;  

        if (!phoneRegex.test(phoneNum)){
            setPhoneError("연락처를 다시 확인해 주세요.");
            verify = false;
        }else{
            setPhoneError('');
        }    

        //증거금 유효성 검증
        if(selectedDeposit.length <= 0){
            setSelectedDepositError("청약 수량을 다시 선택하세요.");
            verify = false;
        }else{
            setSelectedDepositError("");
        }
        
        if(verify)
            navigate(`/nav2/sub2`,); 
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
                        <TextDiv>{subscriptionData ? "온라인/50%":""}</TextDiv>                        
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 수수료</TitleDiv>
                        <TextDiv>{subscriptionData ? "2,000" : ""}</TextDiv>
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
                            {(e) => setAccountPassword(e.target.value)}
                        <CustomSelect options={subscriptionAmountSelect.length > 0 ? subscriptionAmountSelect : Options}  onOptionChange={e=> setSelectedAmount(e.value)} />
                        </TextDiv>
                        <TitleDiv>공모가(확정발행가)</TitleDiv>
                        <TextDiv>{subscriptionData && subscriptionData.slprc ? subscriptionData.slprc:""}</TextDiv>
                    </ContentsDiv>

                    <ContentsDiv>
                        <TitleDiv>청약 증거금</TitleDiv>
                        <TextDiv>{subscriptionData ? 
                                (selectedDepositError && selectedDepositError.length > 0 
                                    ? <span style={{color: 'red'}}>{selectedDepositError}</span> 
                                    : <span style={{color: 'black'}}>{selectedDeposit}</span>) :"" }</TextDiv>
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
                        <button onClick={[()=> navigate(-1)]}>이전</button>
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
