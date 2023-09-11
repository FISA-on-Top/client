import React from "react";
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';

function AdminPageSub() {
    const externalPageURL = 'http://43.200.191.48:3000/login'; // 외부 페이지 URL

    const openExternalGrafanaPage = () => {
        window.open(externalPageURL, '_blank'); // 외부 페이지를 새 탭으로 엽니다.
    };

    return (
        <ContainerDiv>
            <h1>모니터링 시스템</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>Grafana</TitleDiv>
                    <TextDiv><button onClick={openExternalGrafanaPage}>이동</button></TextDiv>
                </ContentsDiv>
            </WrapperDiv>
        </ContainerDiv>
    );
}

export default AdminPageSub;