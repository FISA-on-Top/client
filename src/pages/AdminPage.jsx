import React, { useEffect, useState } from "react";
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import PageNavigation from "../components/PageNavigation";


function AdminPage() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/alluserinfo?index=${currentPage}`);

                if (!response.ok) {
                    throw new Error('API 호출 중 에러 발생');
                }

                const result = await response.json();

                if (result.resultCode === '0000') {
                    setTotalPage(result.data.currentPage);
                    setData(result.data);
                } else {
                    console.error('API 호출 중 에러 발생:', result.resultMessage);
                }

            } catch (error) {
                console.error('API 호출 중 에러 발생:', error);
            }
        };

        fetchData();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <ContainerDiv>
            <h1>고객정보조회</h1>
            <WrapperDiv>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>이름</TableHeader>
                            <TableHeader>생년월일</TableHeader>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>계좌번호</TableHeader>
                            <TableHeader>가입일</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.userName}</TableCell>
                                <TableCell>{item.birth}</TableCell>
                                <TableCell>{item.userId}</TableCell>
                                <TableCell>{item.accountNum}</TableCell>
                                <TableCell>{item.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>

                <PageNavigation
                    currentPage={currentPage}
                    totalPage={totalPage}
                    onPageChange={handlePageChange}
                />

            </WrapperDiv>
        </ContainerDiv>
    );
}

export default AdminPage;