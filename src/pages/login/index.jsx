import React from 'react';
import Logo from '../../components/Logo/Logo';
import LoginForm from './LoginForm';

import '../../asset/css/Common.css';

const Login = () => {
    return (
        <div className='login'>
            <Logo width="auto" height={50} className="logo-login" />
            <LoginForm />
        </div>
    );
}

export default Login;
