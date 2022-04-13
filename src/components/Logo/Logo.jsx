import React from 'react';
import logo from '../../asset/images/hblab-logo.png';

const Logo = ({width, height, className}) => {
    const shape = {
        width,
        height
    }
    return (
        <div className={className}>
            <img src={logo} alt="Logo company" className="logo-company" style={shape} />
        </div>
    );
}

export default Logo;
