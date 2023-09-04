import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from '../styled/StyledContents';

function Nav3Sub2() {
    const navigate = useNavigate();
    const location = useLocation();
    const cancelDate = new Date();

    const onSubmitClick = () => {
        navigate('/nav3');
    }

    return (
        <ContainerDiv>
            <h1>청약 취소 확인</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>
                        청약계좌번호
                    </TitleDiv>
                    <TextDiv>
                        {location.state.userAccount}
                    </TextDiv>
                    <TitleDiv>
                        청약취소일
                    </TitleDiv>
                    <TextDiv>
                        {cancelDate.toISOString().split('T')[0]}
                    </TextDiv>
                </ContentsDiv>

                <ContentsDiv>
                    <TitleDiv>
                        청약종목명
                    </TitleDiv>
                    <TextDiv>
                        {location.state.row.corpName}
                    </TextDiv>
                    <TitleDiv>
                        청약종목번호
                    </TitleDiv>
                    <TextDiv>
                        {location.state.row.corpCode}
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <button onClick={onSubmitClick}>확인</button>
        </ContainerDiv>
    );
}

export default Nav3Sub2;
