import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const NavContainer = styled.div`
    background-color: blue;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 8px;
`;

const LogoDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ImgLogo = styled.img`
    height: 40px;
    object-fit: contain;
`;

const NavUl = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 20px;
    margin-left: initial;
`;

const NavLinkStyled = styled(NavLink)`
    text-decoration: none;
    color: white;
    &:hover {
        text-decoration: underline;
    }
    display: flex;
    align-items: center;
`;

function Navbar({ onNavClick, isLoggedIn }) {
    return (
        <NavContainer>
            <LogoDiv>
                <NavLinkStyled to="/nav1" onClick={() => onNavClick('nav1')}>
                    <ImgLogo src="/img/logo.png" alt="로고 이미지" />
                    <p className='bold'>우리증권</p>
                </NavLinkStyled>
            </LogoDiv>
            <NavUl>
                <li>
                    <NavLinkStyled to="/nav1" onClick={() => onNavClick('nav1')}>
                        공모주 조회
                    </NavLinkStyled>
                </li>
                <li>
                    {isLoggedIn ? (
                        <NavLinkStyled to="/nav2" onClick={() => onNavClick('nav2')}>
                            공모주 신청
                        </NavLinkStyled>
                    ) : (
                        <NavLinkStyled to="/login" onClick={() => onNavClick('nav2')}>
                            공모주 신청
                        </NavLinkStyled>
                    )}
                </li>
                <li>
                    {isLoggedIn ? (
                        <NavLinkStyled to="/nav3" onClick={() => onNavClick('nav3')}>
                            청약 결과 조회/취소
                        </NavLinkStyled>
                    ) : (
                        <NavLinkStyled to="/login" onClick={() => onNavClick('nav3')}>
                            청약 결과 조회/취소
                        </NavLinkStyled>
                    )}
                </li>
            </NavUl>
        </NavContainer>
    );
}

export default Navbar;
