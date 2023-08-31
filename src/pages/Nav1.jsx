import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MyCalendar from '../components/MyCalendar';

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

function Nav1() {
    const navigate = useNavigate();

    const [calData, onChange] = useState(new Date());

    const nav1ButtonClick = () => {
        navigate('/nav1');
    }

    const nav1subButtonClick = () => {
        navigate('/nav1sub');
    }

    return (
        <div>
            <NavButtonDiv>
                <NavButton onClick={nav1ButtonClick} isActive={true}>청약 일정 조회</NavButton>
                <NavButton onClick={nav1subButtonClick}>청약 목록 조회</NavButton>
            </NavButtonDiv>
            <MyCalendar onChange={onChange} value={calData} />

        </div>
    );
}

export default Nav1;
