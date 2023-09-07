import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import BASE_URL from '../config';

function Nav3() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const [userAccount, setUserAccount] = useState('');
    const [urlDate, setUrlDate] = useState(new Date().toISOString().split('T')[0]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await fetch(`${BASE_URL}/orders/account`, {
                    method: 'GET',
                    headers: { 'userId': userId }
                });

                if (!response.ok) {
                    throw new Error('Account response was not ok');
                }

                const data = await response.json();

                if (data.resultCode !== '0000') {
                    alert(data.data);
                    return;
                }

                setUserAccount(data.data.accountNum);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAccount();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/orders?date=${urlDate}`, {
                method: 'GET',
                header: { 
                    'Content-Type': 'application/json',
                    'userId': userId 
                }
            });

            if (!response.ok) {
                throw new Error('Account response was not ok');
            }

            const datas = await response.json();
            setData(datas.data.ipoSummary);
            console.log(data);
        } catch (error) {
            console.error('데이터를 불러오는 도중 오류가 발생했습니다.', error);
        }
    };

    const handleDateChange = (date) => {
        const parseDate = date.toISOString().split('T')[0];
        setUrlDate(parseDate);
        setSelectedDate(date);
    };

    const handleButtonClick = (row) => {
        console.log(row);
        navigate('/nav3/sub1', {
            state: {
                userAccount: userAccount,
                row: row
            }
        });
    };

    const onInquiryClick = () => {
        fetchData();
    }

    return (
        <div>
            <ContainerDiv>
                <h1>청약 결과 조회</h1>

                <WrapperDiv>
                    <ContentsDiv>
                        <TitleDiv>계좌 설정</TitleDiv>
                        <TextDiv>
                            {userAccount}
                        </TextDiv>
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>조회 기간</TitleDiv>
                        <TextDiv><DatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={selectedDate}
                            onChange={handleDateChange} /></TextDiv>
                    </ContentsDiv>
                </WrapperDiv>
                <button onClick={onInquiryClick}>조회</button>
            </ContainerDiv>

            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>선택</TableHeader>
                            <TableHeader>분류</TableHeader>
                            <TableHeader>기업명</TableHeader>
                            <TableHeader>청약종목번호</TableHeader>
                            <TableHeader>청약기간</TableHeader>
                            <TableHeader>환불일</TableHeader>
                            <TableHeader>청약증거금</TableHeader>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 && data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <button onClick={() => handleButtonClick(row)}>취소하기</button>
                                </TableCell>
                                <TableCell>{row.corpCls}</TableCell>
                                <TableCell>{row.corpName}</TableCell>
                                <TableCell>{row.corpCode}</TableCell>
                                <TableCell>{row.sbd} ~ {(new Date(row.sbd).getDate() + 1)}</TableCell>
                                <TableCell>{row.refund}</TableCell>
                                <TableCell>{row.deposit}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>

        </div>
    );
}

export default Nav3;
