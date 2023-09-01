import React, { useEffect, useState } from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import DatePicker from 'react-datepicker';
import Dropdown from '../components/Dropdown';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import { useNavigate } from 'react-router-dom';

function Nav3() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const [userAccount, setUserAccount] = useState('');
    const [urlDate, setUrlDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedData, setSelectedData] = useState({
        id: null,
        companyName: '',
        accountNumber: '',
    });
    const userId = 'user01';

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await fetch(`https://5674dead-9b15-43f4-9eb4-21debfa1c2be.mock.pstmn.io/orders/account/`, {
                    method: 'GET',
                    headers: { 'userId': userId }
                });

                if (!response.ok) {
                    throw new Error('Account response was not ok');
                }

                const data = await response.json();
                setUserAccount(data.data.accountNum);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchAccount();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://5674dead-9b15-43f4-9eb4-21debfa1c2be.mock.pstmn.io/orders?date=${urlDate}`, {
                method: 'GET',
                header: { 'userId': userId }
            });

            if (!response.ok) {
                throw new Error('Account response was not ok');
            }

            const datas = await response.json();
            setData(datas.data[0].orderList);
            console.log(data);
        } catch (error) {
            console.error('데이터를 불러오는 도중 오류가 발생했습니다.', error);
        }
    };

    const handleSelect = (id) => {
        console.log(`선택된 아이디: ${id}`);
    };

    const handleDateChange = (date) => {
        const parseDate = date.toISOString().split('T')[0];
        setUrlDate(parseDate);
        setSelectedDate(date);
    };

    const handleButtonClick = (row) => {
        // setSelectedData(updatedData);여기수정수정수정수정
        navigate('/nav3/sub1', {
            state: {
                userAccount: userAccount,
                corpName: row.companyName,
                accNum: row.accountNumber,
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
                            <TableHeader>확정발행가</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 && data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <button onClick={() => handleButtonClick(row)}>선택</button>
                                </TableCell>
                                <TableCell>{row.corpCls}</TableCell>
                                <TableCell>{row.corpName}</TableCell>
                                <TableCell>{row.corpCode}</TableCell>
                                <TableCell>{row.sbd} ~ {(new Date(row.sbd).getDate() + 1)}</TableCell>
                                <TableCell>{row.refundDate}</TableCell>
                                <TableCell>{row.issuePrice}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Nav3;
