import React from 'react';
import styled from 'styled-components';
import { NavPageContainedButton, CellButton } from '../styled/StyledContents';

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
`;


function PageNavigation({ currentPage, totalPage, onPageChange }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    function handlePageChange(pageNumber) {
        if (currentPage !== pageNumber) {
            onPageChange(pageNumber);
        }
    }

    return (
        <div>
            <ButtonDiv>
                <NavPageContainedButton
                    className={currentPage === 1 ? 'disabled' : ''}

                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    &laquo;
                </NavPageContainedButton>

                {pageNumbers.map((pageNumber) => (
                    <CellButton
                        key={pageNumber}
                        className={currentPage === pageNumber ? 'active' : ''}
                        onClick={() => handlePageChange(pageNumber)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer'  }}>
                        {pageNumber}
                    </CellButton>
                ))}

                <NavPageContainedButton
                    className={currentPage === totalPage ? 'disabled' : ''}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPage}
                >
                    &raquo;
                </NavPageContainedButton>
            </ButtonDiv>
        </div>
    );
}

export default PageNavigation;
