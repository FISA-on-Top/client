import { React, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isAdminAtom, userIdInfo } from './state/state';
import Header from './components/Header';
import Navbar from './components/Navbar';
import MyPageUser from './pages/MyPageUser';
import Nav1 from './pages/Nav1';
import Nav2 from './pages/Nav2';
import Nav3 from './pages/Nav3';
import LoginPage from './pages/LoginPage';
import Nav1Sub from './pages/Nav1Sub';
import Nav2Sub1 from './pages/Nav2Sub1';
import Nav2Sub2 from './pages/Nav2Sub2';
import MyPageMod from './pages/MyPageMod';
import MyPageWithdraw from './pages/MyPageWithdraw';
import Nav3Sub1 from './pages/Nav3Sub1';
import Nav3Sub2 from './pages/Nav3Sub2';
import SignupAccount from './pages/SignupAccount';
import SignupId from './pages/SignupId';
import AdminPage from './pages/AdminPage';
import HeaderAdmin from './components/HeaderAdmin';
import NavbarAdmin from './components/NavbarAdmin';
import AdminPageSub from './pages/AdminPageSub';

const styles = {
    main: {
        display: "flex",
        justifyContent: "center",
    },
};

function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false); 임시
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(userIdInfo);
    const [currentNav, setCurrentNav] = useState('nav1');
    const isAdmin = useRecoilValue(isAdminAtom);

    const handleNavClick = (nav) => {
        setCurrentNav(nav);
    };

    return (
        <div>
            {isAdmin ? (
                <>
                    <HeaderAdmin />
                    <NavbarAdmin />
                </>
            ) : (
                <>
                <Header/>
                <Navbar onNavClick={handleNavClick} />
                </>
            )}

            <main style={styles.main}>
                <Routes>
                    <Route path="/" element={<LoginPage currentNav={currentNav} />} />
                    <Route path="/nav1" element={<Nav1 />} />
                    <Route path="/nav1sub" element={<Nav1Sub />} />
                    <Route path="/nav2" element={<Nav2 />} />
                    <Route path="/nav3" element={<Nav3 />} />
                    <Route path="/mypage" element={<MyPageUser />} />
                    <Route path="/login" element={<LoginPage currentNav={currentNav} />} />
                    <Route path="/nav2/sub1" element={<Nav2Sub1 />} />
                    <Route path="/nav2/sub2" element={<Nav2Sub2 />} />
                    <Route path="/mypage/mod" element={<MyPageMod />} />
                    <Route path="/mypage/withdraw" element={<MyPageWithdraw />} />
                    <Route path="/nav3/sub1" element={<Nav3Sub1 />} />
                    <Route path="/nav3/sub2" element={<Nav3Sub2 />} />
                    <Route path="/signupAccount" element={<SignupAccount />} />
                    <Route path="/signupId" element={<SignupId />} />
                    <Route path="/adminPage" element={<AdminPage />} />
                    <Route path="/adminPage/sub" element={<AdminPageSub />} />
                </Routes>
            </main>

        </div>
    );
}

export default App;
