import React from 'react';
import Input from '../../components/Input/Input';
import Logo from '../../components/Logo/Logo';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postEmailForgot } from '../../store/actions/forgotAuth';
import { loading, loadSuccess } from "../../store/actions/common";
import { LoadingOutlined } from "@ant-design/icons";
import {
    validateEmail,
    validateRequired,
} from "../../helpers/validator";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TIME_CLOSE } from './../../config/constants';
import '../../asset/css/Common.css';
import { Link } from 'react-router-dom';

toast.configure()
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const refEmail = useRef();
    const isLoading = useSelector((state) => state.common.isLoading);
    const handleSubmit = () => {
        dispatch(loading())
        const notice = validateMail(email);
        if (notice.message === '') {
            dispatch(postEmailForgot(email, onSuccess, onError));
        } else {
            alert(notice.message);
            if (notice.point === 1) {
                refEmail.current.focus();
            }
        }
    }
    const onSuccess = (message) => {
        toast.success((message), {
            autoClose: TIME_CLOSE
        })
        dispatch(loadSuccess());
    }
    const onError = (message) => {
        toast.error((message), { autoClose: TIME_CLOSE })
        dispatch(loadSuccess());
    }
    const handleChange = (e) => {
        const type = e.target.type;
        const value = e.target.value;
        if (type === "email") {
            setEmail(value)
        }
    }
    const validateMail = (email) => {
        const notice = { message: "", point: 0 };
        if (validateRequired(email) !== "") {
            notice.message = validateRequired(email);
            notice.point = 1;
        } else if (validateEmail(email) !== "") {
            notice.message = validateEmail(email);
            notice.point = 1;
        }
        return notice;
    };
    return (
        <div className='login'>
            <Logo width="auto" height={50} className="logo-login" />
            <div className="form-group_forgot">
                <h1 style={{ marginBottom: '40px' }}>Forgot Password</h1>
                <Input type="email" ref={refEmail} labelName="Email" onChange={handleChange} value={email} />
                <button className="btn btn-login" onClick={handleSubmit} style={{ marginTop: '30px' }}>
                    {isLoading ? <LoadingOutlined /> : "Send Mail"}
                </button>
                <Link to="/login" className="back_login">Back to Login</Link>
            </div>
        </div>
    );
}

export default ForgotPassword;
