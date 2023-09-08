import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userLoggedIn } from '../state/state';

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

function NavbarAdmin() {
    const isLoggedIn = useRecoilValue(userLoggedIn);

    return (
        <NavContainer>
            <LogoDiv>
                <NavLinkStyled to="/adminPage">
                    <ImgLogo src="/img/logo.png" alt="로고 이미지" />
                    <p className='bold'>우리증권</p>
                </NavLinkStyled>
            </LogoDiv>

            <NavUl>
                <li>
                    {isLoggedIn ? (
                        <NavLinkStyled to="/adminPage">
                            고객정보조회
                        </NavLinkStyled>
                    ) : (
                        <NavLinkStyled to="/login">
                            고객정보조회
                        </NavLinkStyled>
                    )}
                </li>
                <li>
                    {isLoggedIn ? (
                        <NavLinkStyled to="/adminPage/sub">
                            모니터링 시스템
                        </NavLinkStyled>
                    ) : (
                        <NavLinkStyled to="/login">
                            모니터링 시스템
                        </NavLinkStyled>
                    )}
                </li>
            </NavUl>
        </NavContainer>
    );
}

export default NavbarAdmin;
