import React from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
`;

function PageNavigation({ currentPage, eventsPerPage, totalEvents, totalPage, onPageChange }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ButtonDiv>
                <button className={currentPage === 1 ? 'disabled' : ''}>
                    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
                </button>
                {pageNumbers.map((pageNumber) => (
                    <button key={pageNumber} className={currentPage === pageNumber ? 'active' : ''}>
                        <button onClick={() => onPageChange(pageNumber)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                            {pageNumber}
                        </button>
                    </button>
                ))}
                <button className={currentPage === totalPage ? 'disabled' : ''}>
                    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPage}>&raquo;</button>
                </button>
            </ButtonDiv>
        </div>
    );

}

export default PageNavigation;
