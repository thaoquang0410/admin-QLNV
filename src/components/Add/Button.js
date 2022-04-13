import React from 'react';
import '../../asset/css/Button.css';

const Button = ({onClick, className,disabled, children}) => {
    return (
        <div className='btn'>
            <button className={className} onClick={(e)=>onClick(e)} disabled={disabled}>{children}</button>
        </div>
    );
}

export default Button;
