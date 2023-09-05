import React from 'react';
import styled from 'styled-components';

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
                <button
                    className={currentPage === 1 ? 'disabled' : ''}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &laquo;
                </button>

                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={currentPage === pageNumber ? 'active' : ''}
                        onClick={() => handlePageChange(pageNumber)}
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        {pageNumber}
                    </button>
                ))}

                <button
                    className={currentPage === totalPage ? 'disabled' : ''}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPage}
                >
                    &raquo;
                </button>
            </ButtonDiv>
        </div>
    );
}

export default PageNavigation;
