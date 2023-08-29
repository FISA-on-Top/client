import React from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv } from './StyledContents';
import { useNavigate } from 'react-router';

function MyPageMod() {
  const navigater = useNavigate();

  const onModClick = () => {
    navigater(-1);
  }

  return (
    <ContainerDiv>
      <h1>My Page</h1>
      <WrapperDiv>
        <ContentsDiv>
          <TitleDiv>이름</TitleDiv>
          <TextDiv>확인 후 받아오고</TextDiv>
        </ContentsDiv>
        <ContentsDiv>
          <TitleDiv>ID</TitleDiv>
          <TextDiv>확인 후 받아오고</TextDiv>
        </ContentsDiv>
        <ContentsDiv>
          <TitleDiv>생년월일</TitleDiv>
          <TextDiv>확인 후 받아오고</TextDiv>
        </ContentsDiv>
        <ContentsDiv>
          <TitleDiv>핸드폰</TitleDiv>
          <TextDiv><input /></TextDiv>
        </ContentsDiv>
        <ContentsDiv>
          <TitleDiv>Email</TitleDiv>
          <TextDiv><input /></TextDiv>
        </ContentsDiv>
        <ContentsDiv>
          <TitleDiv>계좌 번호</TitleDiv>
          <TextDiv>확인 후 받아오고</TextDiv>
        </ContentsDiv>
      </WrapperDiv>
      <div>
        <button onClick={onModClick}>수정하기</button>
      </div>
    </ContainerDiv>
  );
}

export default MyPageMod;
