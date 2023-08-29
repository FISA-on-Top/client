import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SubscriptionList from './SubscriptionList';

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

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://43.201.20.90/api/ipo/list'); // RestAPI경로
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
            <SubscriptionList events={events}/>
        </div>
    );
}

export default Nav1Sub;
