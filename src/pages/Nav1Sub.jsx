import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageNavigation from '../components/PageNavigation';
import Nav1Popup from '../components/Nav1Popup.jsx';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';

const NavButton = styled.button`
    background-color: ${props => props.isActive ? 'blue' : 'gray'};
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    margin-right: 16px;
    border: none;
    cursor: pointer;
`;

const NavButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
`;

function Nav1Sub() {
    const navigate = useNavigate();

    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`/ipo/list?index=${currentPage}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const eventData = await response.json();
                setEvents(eventData.data.ipoSummary);
                setTotalPage(eventData.data.totalPage);
                
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [currentPage]);

    const fetchDetails = async (ipoId) => {
        try {
            const response = await fetch(`/ipo/list?ipoId=${ipoId}`);

            if (!response.ok){
                throw new Error('Failed to fetch detail');
            }

            const detailData = await response.json();
            setSelectedEvent(detailData.data.ipo[0]);

        } catch (error) {
            console.error('Error fetching Detail:', error);
        }

    }

    const nav1ButtonClick = () => {
        navigate('/nav1');
    }

    const nav1subButtonClick = () => {
        navigate('/nav1sub');
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleTableClick = (event) => {
        setSelectedEvent(event);
        fetchDetails(event.ipoId);
        setPopupVisible(true);
    }

    const handleClosePopup = () => {
        setPopupVisible(false);
    }

    return (
        <div>
            <NavButtonDiv>
                <NavButton onClick={nav1ButtonClick}>청약 일정 조회</NavButton>
                <NavButton onClick={nav1subButtonClick} isActive={true}>청약 목록 조회</NavButton>
            </NavButtonDiv>

            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>IPO ID</TableHeader>
                            <TableHeader>법인 구분</TableHeader>
                            <TableHeader>기업명</TableHeader>
                            <TableHeader>주관사</TableHeader>
                            <TableHeader>청약일</TableHeader>
                            <TableHeader>환불일</TableHeader>
                            <TableHeader>확정발행가</TableHeader>
                        </tr>
                    </thead>

                    <tbody>
                        {events
                            .map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell>{event.ipoId}</TableCell>
                                    <TableCell>{event.corpCls}</TableCell>
                                    <TableCell>
                                        <button onClick={() => handleTableClick(event)}>
                                            {event.corpName}
                                        </button>
                                    </TableCell>
                                    <TableCell>{event.leadManager}</TableCell>
                                    <TableCell>{event.sbd}</TableCell>
                                    <TableCell>{event.refund}</TableCell>
                                    <TableCell>{event.slprc}</TableCell>
                                </TableRow>
                            ))}
                    </tbody>
                </Table>
            </TableContainer>

            <PageNavigation
                currentPage={currentPage}
                totalPage={totalPage}
                onPageChange={handlePageChange}
            />

            <Nav1Popup event={selectedEvent} isVisible={isPopupVisible} onClose={handleClosePopup} />
        </div>
    );
}

export default Nav1Sub;
