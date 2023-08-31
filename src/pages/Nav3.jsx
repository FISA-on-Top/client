import React, { useState } from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import DatePicker from 'react-datepicker';
import Dropdown from '../components/Dropdown';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import { useNavigate } from 'react-router-dom';

function Nav3() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const [selectedAccount, setSelectedAccount] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [selectedData, setSelectedData] = useState({
        id: null,
        companyName: '',
        accountNumber: '',
    });

    const fetchData = async () => {
        try {
            const dummyData = [
                {
                    id: 1,
                    category: '카테고리1',
                    companyName: '기업1',
                    underwriter: '주관회사1',
                    subscriptionPeriod: '2023-08-01 ~ 2023-08-10',
                    refundDate: '2023-08-15',
                    issuePrice: '10000원',
                    accountNumber: '1234-5678',
                },
                {
                    id: 2,
                    category: '카테고리2',
                    companyName: '기업2',
                    underwriter: '주관회사2',
                    subscriptionPeriod: '2023-08-05 ~ 2023-08-12',
                    refundDate: '2023-08-17',
                    issuePrice: '15000원',
                    accountNumber: '5678-1234',
                },
            ];

            setData(dummyData);
        } catch (error) {
            console.error('데이터를 불러오는 도중 오류가 발생했습니다.', error);
        }
    };

    const handleSelect = (id) => {
        console.log(`선택된 아이디: ${id}`);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleButtonClick = (row) => {
        const updatedData = {
            id: row.id,
            companyName: row.companyName,
            accountNumber: row.accountNumber,
        };

        setSelectedData(updatedData);
        navigate('/nav3/sub1', {
            state: {
                id: row.id,
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
                            {accounts}
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
                            <TableHeader>대표주관회사</TableHeader>
                            <TableHeader>청약기간</TableHeader>
                            <TableHeader>환불일</TableHeader>
                            <TableHeader>확정발행가</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <button onClick={() => handleButtonClick(row)}>선택</button>
                                </TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{row.companyName}</TableCell>
                                <TableCell>{row.underwriter}</TableCell>
                                <TableCell>{row.subscriptionPeriod}</TableCell>
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
