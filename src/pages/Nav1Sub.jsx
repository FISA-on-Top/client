import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import PageNavigation from '../components/PageNavigation';
import Nav1Popup from '../components/Nav1Popup.jsx';

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
    const [eventsPerPage] = useState(10);
    const [totalPage] = useState(1);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('./ipo.json'); // RestAPI경로
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const eventData = await response.json();
                setEvents(eventData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // eventsPerPage와 pageNumber 변수로 페이지 이동
    };

    const handleTableClick = (event) => {
        setSelectedEvent(event);
        setPopupVisible(true);
    }

    const handleClosePopup = () => {
        setPopupVisible(false);
    }

    const nav1ButtonClick = () => {
        navigate('/nav1');
    }

    const nav1subButtonClick = () => {
        navigate('/nav1sub');
    }

    return (
        <div>
            <NavButtonDiv>
                <NavButton onClick={nav1ButtonClick}>청약 일정 조회</NavButton>
                <NavButton onClick={nav1subButtonClick} isActive={true}>청약 목록 조회</NavButton>
            </NavButtonDiv>
            {/* <SubscriptionList events={events} /> */}

            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>IPO ID</TableHeader>
                            <TableHeader>기업코드</TableHeader>
                            <TableHeader>기업명</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {/* events 배열을 현재 페이지와 eventsPerPage를 기반으로 잘라서 표시 */}
                        {events
                            .slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)
                            .map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell>{event.ipoId}</TableCell>
                                    <TableCell>{event.corpCode}</TableCell>
                                    <TableCell><button onClick={() => handleTableClick(event)}>
                                        {event.corpName}
                                    </button></TableCell>
                                    {/* 컬럼 수정합시다 */}
                                </TableRow>
                            ))}
                    </tbody>
                </Table>
            </TableContainer>

            <PageNavigation
                currentPage={currentPage}
                eventsPerPage={eventsPerPage}
                totalEvents={events.length}
                totalPage={totalPage}
                onPageChange={handlePageChange}
            />
            <Nav1Popup event={selectedEvent} isVisible={isPopupVisible} onClose={handleClosePopup} />
        </div>
    );
}

export default Nav1Sub;
