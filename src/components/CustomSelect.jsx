import React, { useState } from 'react';
import Select from 'react-select';
import { StyledInput } from '../styled/StyledContents';

const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 30,
      backgroundColor: '#ffffff',
      borderRadius: '5px',
      boxShadow: 'none',
      borderColor: '#ccc',
      padding: '0 30px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#333',
    }),
    option: (provided) => ({
      ...provided,
      padding: '10px 20px',
    }),
  };

const CSelect = (props) => {
    const { children, ...restProps } = props;

    return (
        <label style={{ marginRight: '1em' }}>
            <StyledInput type="checkbox" {...restProps}/>
            {children}
        </label>
    );
};

export default function CustomSelect({ options, onOptionChange }) {
    const [isClearable, setIsClearable] = useState(false);
    const [isSearchable, setIsSearchable] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={""}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                options={options}
                styles={customStyles}
                onChange={onOptionChange}
            />

            <div
                style={{
                    color: 'hsl(0, 0%, 40%)',
                    display: 'inline-block',
                    fontSize: 10,
                    fontStyle: 'italic',
                    marginTop: '1em',
                    height: '10px',
                }}
            >
            </div>
        </>
    );
}




