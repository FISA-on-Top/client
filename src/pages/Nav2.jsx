import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { calendarDate, ipoList, selectedIpo } from '../state/stateForNav2.js';
import BASE_URL from '../config.js';
import PageNavigation from '../components/PageNavigation.jsx';

const Nav2TableContainer = styled(TableContainer)`
  width: 1200px;
`;

function SubscriptionRequest() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useRecoilState(calendarDate);
    const [ipoData, setIpoData] = useRecoilState(ipoList);
    const setIpoId = useSetRecoilState(selectedIpo);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        if (currentPage !== 0) {
            fetchData();
        }

        return () => {
            setIpoData(null);
        }
    }, [currentPage]);


    const fetchData = async () => {
        const apiUrl = `${BASE_URL}/orders/`;

        try {
            const formattedDate = selectedDate.toISOString().split('T')[0];

            const queryParams = new URLSearchParams();
            queryParams.append('date', formattedDate);
            queryParams.append('index', currentPage);

            const response = await fetch(`${apiUrl}?${queryParams}`);

            if (!response.ok) {
                throw new Error('Orders Index Request failed');
            }

            const data = await response.json();

            if (data.resultCode !== '0000') {
                alert(data.data);
                return;
            }

            setTotalPage(data.data.totalPage);
            setCurrentPage(data.data.currentPage);
            setIpoData(data);

        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    };

    const onSearchClick = () => {
        setCurrentPage(1);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const onRequestClick = (data) => {
        setIpoId(data);
        navigate('/nav2/sub1');
    }

    return (
        <div>
            <h1>청약 신청 조회</h1>
            <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={selectedDate}
                onChange={handleDateChange} />
            {/* <button onClick={fetchData}>조회</button> */}
            <button onClick={onSearchClick}>조회</button>
            <Nav2TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>선택</TableHeader>
                            <TableHeader>(법인)구분</TableHeader>
                            <TableHeader>기업명</TableHeader>
                            <TableHeader>상장주관사</TableHeader>
                            <TableHeader>청약기일</TableHeader>
                            <TableHeader>환불일</TableHeader>
                            <TableHeader>확정발행가</TableHeader>
                        </tr>
                    </thead>
                    {ipoData !== null ? (
                        <tbody>
                            {ipoData && ipoData.data.ipoSummary ? (
                                Array.isArray(ipoData.data.ipoSummary) ? (
                                    ipoData.data.ipoSummary.map((item) => (
                                        <TableRow key={item.ipoId}>
                                            <TableCell>
                                                <button onClick={() => onRequestClick(item.ipoId)}>청약하기</button>
                                            </TableCell>
                                            <TableCell>{item.corpCls}</TableCell>
                                            <TableCell>{item.corpName}</TableCell>
                                            {/* <TableCell>{item.leadManager}</TableCell> */}
                                            <TableCell>우리증권</TableCell>
                                            <TableCell>{item.sbd}</TableCell>
                                            <TableCell>{item.refund}</TableCell>
                                            <TableCell>{item.slprc}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow key={ipoData.data.ipoSummary.ipoId}>
                                        <TableCell>
                                            <button onClick={() => onRequestClick(ipoData.data.ipoSummary.ipoId)}>청약하기</button>
                                        </TableCell>
                                        <TableCell>{ipoData.data.ipoSummary.corpCls}</TableCell>
                                        <TableCell>{ipoData.data.ipoSummary.corpName}</TableCell>
                                        <TableCell>우리증권</TableCell>
                                        <TableCell>{ipoData.data.ipoSummary.sbd}</TableCell>
                                        <TableCell>{ipoData.data.ipoSummary.refund}</TableCell>
                                        <TableCell>{ipoData.data.ipoSummary.slprc}</TableCell>
                                    </TableRow>
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="12">기간을 설정해주세요.</TableCell>
                                </TableRow>
                            )}
                        </tbody>
                    ) : (
                        <tbody>
                            <TableRow>
                                <TableCell colSpan="12">기간을 설정해주세요.</TableCell>
                            </TableRow>
                        </tbody>
                    )}
                </Table>
            </Nav2TableContainer>

            <PageNavigation
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={handlePageChange}
            />
        </div>
    );

}

export default SubscriptionRequest;
