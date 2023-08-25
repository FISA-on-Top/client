import React, { useState } from "react";
import styled from "styled-components";
import Nav1Popup from "./Nav1Popup";

const ItemContainer = styled.div`
    border: 1px solid;
    padding: 16px;
    margin-bottom: 16px;
    cursor: pointer;
`;

const ItemTitle = styled.h3`
  margin: 0;
  &:hover {
    color: blue;
  }
`;

const ItemContent = styled.p`
  margin: 8px 0;
`;

function SubscriptionItem({ title, description }) {
    const [popupVisible, setPopupVisible] = useState(false);

    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <>
            <ItemContainer onClick={openPopup}>
                <ItemTitle>{title}</ItemTitle>
                {/* <ItemContent>{description}</ItemContent> */}
            </ItemContainer>
            <Nav1Popup event={{ title, description }} isVisible={popupVisible} onClose={closePopup} />
        </>
    );
}

export default SubscriptionItem;