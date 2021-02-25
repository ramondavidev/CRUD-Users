import React, { Fragment } from 'react';

import './formInput.styles.scss';

const FormInput = ({ label, type, handleChange, value }) => {
    return (
        <Fragment >
            <label>{label}</label>
            <input type={type} value={value} onChange={ e => handleChange(e.target.value) } />
        </Fragment>
        
    )
}

export default FormInput;