import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StyledDatePicker } from '../styled/StyledDatePicker.jsx';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import { SmallContainedButton } from '../styled/StyledContents';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { calendarDate, ipoList, selectedIpo } from '../state/stateForNav2.js';
import BASE_URL from '../config.js';
import PageNavigation from '../components/PageNavigation.jsx';

// testURPRPRUPRUPURL
const temp_URL = 'https://db4d417c-9e4a-46b3-bd45-9245a9d99984.mock.pstmn.io/api';

const Nav2TableContainer = styled(TableContainer)`
  width: 1200px;
`;

function SubscriptionRequest() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useRecoilState(calendarDate);
    // const [ipoData, setIpoData] = useRecoilState(ipoList);
    const [ipoData, setIpoData] = useState(ipoList);
    const setIpoId = useSetRecoilState(selectedIpo);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    console.log(typeof selectedDate);

    useEffect(() => {
        console.log(currentPage);
        if (currentPage !== 0) {
            fetchData();
        }
    }, [currentPage]);


    const fetchData = async () => {
        //const apiUrl = '/api/orders/';
        const apiUrl = `${BASE_URL}/orders/`;

        if (currentPage === '0') {
            return;
        }

        try {
            const formattedDate = selectedDate.toISOString().split('T')[0];

            console.log(formattedDate);
            // URL의 쿼리 매개변수 생성
            const queryParams = new URLSearchParams();
            queryParams.append('date', formattedDate);
            queryParams.append('index', currentPage);

            const response = await fetch(`${apiUrl}?${queryParams}`)
                .then(response => response.json())
                .then(data => {
                    setTotalPage(data.data.totalPage);
                    setCurrentPage(data.data.currentPage);
                    setIpoData(data);
                })
                .catch(error => {
                    console.log(error);
                    throw new Error('Failed to fetch data');
                });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
            <div>
            <SmallContainedButton onClick={fetchData}>조회</SmallContainedButton>
                <StyledDatePicker
                    dateFormat="yyyy-MM-dd"
                    selected={selectedDate}
                    onChange={handleDateChange} />
                
            </div>

            <Nav2TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>선택</TableHeader>
                            <TableHeader>(법인)구분</TableHeader>
                            <TableHeader>기업명</TableHeader>
                            <TableHeader>청약기일</TableHeader>
                            <TableHeader>환불일</TableHeader>
                            <TableHeader>확정발행가</TableHeader>
                        </tr>
                    </thead>
                    {currentPage !== 0 ? (
                        <tbody>
                            {ipoData && ipoData.data.ipoSummary ? (
                                Array.isArray(ipoData.data.ipoSummary) ? (
                                    ipoData.data.ipoSummary.map((item) => (
                                        <TableRow key={item.ipoId}>
                                            <TableCell>
                                                <SmallContainedButton onClick={() => onRequestClick(item.ipoId)}>청약하기</SmallContainedButton>
                                            </TableCell>
                                            <TableCell>{item.corpcls}</TableCell>
                                            <TableCell>{item.corpName}</TableCell>
                                            <TableCell>{item.sbd}</TableCell>
                                            <TableCell>{item.refund}</TableCell>
                                            <TableCell>{item.slprc}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow key={ipoData.data.ipoSummary.ipoId}>
                                        <TableCell>
                                            <SmallContainedButton onClick={() => onRequestClick(ipoData.data.ipoSummary.ipoId)}>청약하기</SmallContainedButton>
                                        </TableCell>
                                        <TableCell>{ipoData.data.ipoSummary.corpcls}</TableCell>
                                        <TableCell>{ipoData.data.ipoSummary.corpName}</TableCell>
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
