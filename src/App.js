import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import MyPageUser from './components/MyPageUser';
import Nav1 from './components/Nav1';
import Nav2 from './components/Nav2';
import Nav3 from './components/Nav3';
import LoginPage from './components/LoginPage';
import Nav1Sub from './components/Nav1Sub';

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
  },
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentNav, setCurrentNav] = useState('nav1');

  const handleLogin = () => {
    // 로그인 처리 로직
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
    setIsLoggedIn(false);
  };

  const handleNavClick = (nav) => {
    setCurrentNav(nav);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
      <Navbar onNavClick={handleNavClick} isLoggedIn={isLoggedIn} />
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Nav1 />} />
          <Route path="/nav1" element={<Nav1 />} />
          <Route path="/nav1Sub" element={<Nav1Sub />} />
          <Route path="/nav2" element={<Nav2 />} />
          <Route path="/nav3" element={<Nav3 />} />
          <Route path="/mypage" element={<MyPageUser />} />
          <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} onLogin={handleLogin} currentNav={currentNav}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
