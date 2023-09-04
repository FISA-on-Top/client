import React, { useEffect, useState } from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accountNumber, commissionPrice, phoneNumber, orderAmount, deposit,applicationDataTime,selectedIpo } from '../state/stateForNav2.js';

function Nav2Sub2() {
    const navigate = useNavigate();
    const location = useLocation();
    const [contractData, setContractData] = useState('');
    const [accountNum, setAccountNum] = useRecoilState(accountNumber);//계좌번호 
    const [commission, setCommission] = useRecoilState(commissionPrice);  //수수료 -> 고정값 2000
    const [phoneNum, setPhoneNum] = useRecoilState(phoneNumber);//연락처
    //const [requestDateTime, setRequestDateTime] = useRecoilState(applicationDataTime); // 신청 날짜
    const [selectedAmount, setSelectedAmount] = useRecoilState(orderAmount); // 청약 수량
    const [selectedDeposit, setSelectedDeposit] = useRecoilState(deposit); //청약증거금
    const [ipoId, setIpoId] = useRecoilState(selectedIpo);

    const onConfirmClick = () => {
        navigate('/nav1');
    }

    // useEffect(() => {
    //     const blockNavigation = (event) => {
    //       // popstate 이벤트 발생 시 (뒤로 가기 동작 시)
    //       alert("뒤로간다!");
    //       event.preventDefault();
    //       return "Are you sure you want to leave this page?";
    //     };
    
    //     // popstate 이벤트 리스너 추가
    //     window.addEventListener('popstate', blockNavigation);
    
    //     // 컴포넌트 언마운트 시 이벤트 리스너 제거
    //     return () => {
    //       window.removeEventListener('popstate', blockNavigation);
    //     };
    //   }, [location]); // location의 변화를 감지하기 위해 종속성 배열에 추가합니다.

    useEffect(() => {
        console.log(selectedDeposit);
        
         const fetchEvents = async () => {
            const now = new Date();

            console.log("지금 몇시게?" + now);
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작하므로 +1
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const requestDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            console.log(                            
                "ipoId " + ipoId+   //ipo id
                "orderAmount " + selectedAmount+    // 청약한 주식 수 
                "PhoneNumber " + phoneNum+
                "orderDate " + requestDateTime+    // 청약신청한 날짜
                "deposit " + selectedDeposit );//청약증거금
            
            // // REST API의 URL
            // const apiUrl = 'https://49c63d20-10d7-40ca-bf3a-0be4bf52acfa.mock.pstmn.io/api/orders/approval';
            // // localStorage에서 userId 정보를 가져옵니다.
            // const userId = localStorage.getItem('userId');

            // console.log(new Date());

            // if (userId) {
            //     try {
            //         const response = await fetch(apiUrl, {
            //             method: 'GET',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 "ipoId" : userId,   //ipo id
            //                 "orderAmount" : selectedAmount,    // 청약한 주식 수 
            //                 "PhoneNumber" : phoneNum,
            //                 "orderDate" : requestDateTime,    // 청약신청한 날짜
            //                 "deposit" : selectedDeposit //청약증거금
            //             },
            //         });

            //         const contractJson = await response.json();
            //         console.log(contractJson);

            //         if (contractJson.resultCode === "0000") {
            //             setContractData(contractJson.data);

            //         } else {
            //             console.error('Error retrieving data:', contractJson.resultMessage);
            //         }
            //     } catch (error) {
            //         console.error("Error fetching the data", error);
            //     }
            // }
            // else {
            //     alert("로그아웃 상태입니다")
            // }

        };

        // const prepareRequest = async () => {
        //     const now = new Date();
    
        //     console.log("지금 몇시게?" + now);
        //     const year = now.getFullYear();
        //     const month = String(now.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작하므로 +1
        //     const day = String(now.getDate()).padStart(2, '0');
        //     const hours = String(now.getHours()).padStart(2, '0');
        //     const minutes = String(now.getMinutes()).padStart(2, '0');
        //     const seconds = String(now.getSeconds()).padStart(2, '0');
    
        //     const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        //     setRequestDateTime(formattedDateTime);
        // };  // useEffect를 컴포넌트 마운트 시점에만 실행하기 위해 의존성 배열을 빈 배열로 설정
    
        
        fetchEvents();
    }, []);


    return (
        <ContainerDiv>
            <h1>계약확인</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>청약계좌번호</TitleDiv>
                    <TextDiv>
                        {accountNum}
                    </TextDiv>
                    <TitleDiv>청약계좌명</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>청약종목명</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>청약구분</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>청약주수</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>공모가(확정발행가)</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>청약수수료</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>청약증거금</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>연락처</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>환불계좌</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>환불일</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                    <TitleDiv>납입일</TitleDiv>
                    <TextDiv>
                        textDiv
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <button onClick={onConfirmClick}>확인</button>
        </ContainerDiv>
    );
}

export default Nav2Sub2;