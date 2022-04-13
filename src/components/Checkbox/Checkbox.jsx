import React from 'react';

import '../../asset/css/CheckboxCommon.css';

const Checkbox = ({ lableName, value, onChange }) => {
    return (
        <div className='check-box'>
            <input type="checkbox" value={value} onChange={onChange} />
            <label>{lableName}</label>
        </div>
    );
}

export default Checkbox;
