import React from "react";
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv, SmallContainedButton } from '../styled/StyledContents';

function AdminPageSub() {
    const externalPageURL = 'http://43.200.191.48:3000/login';

    const openExternalGrafanaPage = () => {
        window.open(externalPageURL, '_blank');
    };

    return (
        <ContainerDiv>
            <h1>모니터링 시스템</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>Grafana</TitleDiv>
                    <TextDiv><SmallContainedButton onClick={openExternalGrafanaPage}>이동</SmallContainedButton></TextDiv>
                </ContentsDiv>
            </WrapperDiv>
        </ContainerDiv>
    );
}

export default AdminPageSub;