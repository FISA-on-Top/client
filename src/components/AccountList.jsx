import React, { useState } from 'react';

const AccountList = ({ items }) => {
    // State를 사용하여 리스트가 보이는지 숨겨져 있는지 상태를 관리
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Hide List' : 'Show List'}
            </button>

            {isVisible && (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FixedTodoList;
