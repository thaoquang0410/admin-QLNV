import { useState, forwardRef } from 'react';
import '../../asset/css/Input.css';
import { validateRequired, validateEmail, validatePassword } from '../../helpers/validator'


const Input = ({ type, labelName, onChange, value }, ref) => {
    const [message, setMessage] = useState();
    const handleChange = (e) => {
        const value = e.target.value;
        onChange(e);
        let notice = validateRequired(value);
        if (type === "email") {
            notice = notice === '' ? validateEmail(value) : notice;
        } else if (type === 'password') {
            notice = notice === '' ? validatePassword(value) : notice;
        }
        setMessage(notice);
    }
    const styleMessge = {
        color: "red",
        fontSize: "smaller",
        float: "left"
    }
    return (
        <div className='input-form'>
            <input type={type} ref={ref} className="input" onChange={handleChange} value={value} placeholder=" " />
            <label className='lable'>{labelName}</label>
            {message !== '' && <span style={styleMessge}>{message}</span>}
        </div>
    );
}

export default forwardRef(Input);
