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
  font-size: 8px;
  margin: 0;
  &:hover {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ItemContent = styled.p`
  margin: 8px 0;
`;

function SubscriptionItem({ event }) {
    const [popupVisible, setPopupVisible] = useState(false);

    const openPopup = () => {
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    const ipoDate = new Date(event.ipoDate);
    const formattedDate = ipoDate.toISOString().split('T')[0];

    return (
      
        <div>
            <ItemContainer onClick={openPopup}>
            <ItemTitle>{event.corpName}</ItemTitle>
            <ItemContent>{formattedDate}</ItemContent>
            </ItemContainer>
            <Nav1Popup event={event} isVisible={popupVisible} onClose={closePopup} />
        </div>
    );
}

export default SubscriptionItem;