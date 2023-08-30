import React from 'react';
import { useLocation } from 'react-router-dom'; // useLocation 추가
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from './StyledContents';

function Nav3Sub1() {
    const location = useLocation(); // useLocation을 사용하여 location 객체 가져오기
    const selectedData = location.state; // location 객체에서 데이터 추출

    console.log(selectedData);

    return (
        <ContainerDiv>
            <h1>청약 취소 확인</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>
                        청약계좌번호
                    </TitleDiv>
                    <TextDiv>
                        {selectedData.id}
                    </TextDiv>
                    <TitleDiv>
                        청약계좌명
                    </TitleDiv>
                    <TextDiv>
                        {selectedData.accNum}
                    </TextDiv>
                </ContentsDiv>

                <ContentsDiv>
                    <TitleDiv>
                        청약종목명
                    </TitleDiv>
                    <TextDiv>
                        {selectedData.corpName}
                    </TextDiv>
                    <TitleDiv>
                        청약종목번호
                    </TitleDiv>
                    <TextDiv>
                        데이터
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <button>확인</button>
        </ContainerDiv>
    );
}

export default Nav3Sub1;
