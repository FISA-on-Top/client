import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 200px;
  cursor: pointer;
`;

const SelectedItem = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  list-style: none;
  margin: 0;
  padding: 0;
  background: white;
  z-index: 1;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.li`
  padding: 8px;
  &:hover {
    background-color: #f7f7f7;
  }
`;

function Dropdown(items) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(items.items[0]);

  const handleItemClick = (item) => {
    console.log("1 " + localStorage.getItem("accounts"));
    setSelected(item);
    setIsOpen(false);
  };

  return (
    <Container onClick={() => setIsOpen(!isOpen)}>
      <SelectedItem>{selected}</SelectedItem>
      <DropdownMenu isOpen={isOpen}>
        {items.items.map((item, index) => (
          <DropdownItem key={index} onClick={() => handleItemClick(item)}>
            {item}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Container>
  );
}

export default Dropdown;
