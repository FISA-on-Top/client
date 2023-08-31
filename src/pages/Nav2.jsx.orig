import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import styled from 'styled-components';

const Nav2TableContainer = styled(TableContainer)`
  width: 1200px;
`;

function MyPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState(null);

    console.log(typeof selectedDate);

    const fetchData = async () => {
        try {
            const formattedDate = selectedDate.toISOString().split('T')[0];

            console.log(formattedDate);

            //const response = await fetch(`/api/data?date=${formattedDate}`); // 서버에 날짜 전송
            const response = await fetch('./신청.json');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <h1>청약 신청 조회</h1>
            <DatePicker
                dateFormat="yyyy-MM-dd" 
                selected={selectedDate} 
                onChange={handleDateChange} />
            <button onClick={fetchData}>조회</button>
            <Nav2TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>신청</TableHeader>
                            <TableHeader>ipo_id</TableHeader>
                            <TableHeader>기업코드</TableHeader>
                            <TableHeader>기업명</TableHeader>
                            <TableHeader>청약기일</TableHeader>
                            <TableHeader>납입기일</TableHeader>
                            <TableHeader>환불일</TableHeader>
                            <TableHeader>상장예정일</TableHeader>
                            <TableHeader>확정발행가</TableHeader>
                            <TableHeader>법인구분</TableHeader>
                            <TableHeader>증권수량</TableHeader>
                            <TableHeader>증자방법</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item) => (
                                <TableRow key={item.ipoId}>
                                    <TableCell>
                                        <Link to={`/nav2/sub1`}>신청</Link>
                                    </TableCell>
                                    <TableCell>{item.ipoId}</TableCell>
                                    <TableCell>{item.corpCode}</TableCell>
                                    <TableCell>{item.corpName}</TableCell>
                                    <TableCell>{item.sbd}</TableCell>
                                    <TableCell>{item.pymd}</TableCell>
                                    <TableCell>{item.refund}</TableCell>
                                    <TableCell>{item.ipoDate}</TableCell>
                                    <TableCell>{item.slprc}</TableCell>
                                    <TableCell>{item.corpCls}</TableCell>
                                    <TableCell>{item.stkcnt}</TableCell>
                                    <TableCell>{item.capitalIncrease}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="12">기간을 설정해주세요.</TableCell>
                            </TableRow>
                        )}
                    </tbody>
                </Table>
            </Nav2TableContainer>
        </div>
    );

}

export default MyPage;
