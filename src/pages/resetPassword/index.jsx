import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/Input/Input";
import Logo from "../../components/Logo/Logo";
import { postEmailReset } from "../../store/actions/resetAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation } from "react-router-dom";
import { TIME_CLOSE } from "./../../config/constants";
import { LoadingOutlined } from "@ant-design/icons";
import { validatePassword, validateRequired } from "../../helpers/validator";
import { loading, loadSuccess } from "../../store/actions/common";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoading = useSelector((state) => state.common.isLoading);
  const refPass = useRef();
  const refConfirmpass = useRef();
  const history = useHistory();
  const handleSubmit = (e) => {
    dispatch(loading());
    const query = new URLSearchParams(location.search);
    const resetToken = query.get("token");
    const notice = validatePass(password, repassword);
    if (notice.message === "") {
      if (repassword !== password) {
        alert("Confirm password is not matched");
        refConfirmpass.current.focus();
      } else {
        const value = {
          password,
          password_confirmation: repassword,
          resetToken,
        };
        dispatch(loading())
        dispatch(postEmailReset(value, onSuccess, onError));
      }
    } else {
      alert(notice.message);
      if (notice.point === 1) {
        refPass.current.focus();
      } else {
        refConfirmpass.current.focus();
      }
    }
  };
  const onSuccess = (message) => {
    toast.success(message, {
      autoClose: TIME_CLOSE,
    });
    history.push("/login");
    dispatch(loadSuccess());
  };
  const onError = (message) => {
    toast.error(message, { autoClose: TIME_CLOSE });
    dispatch(loadSuccess());
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handleChangeconfirm = (e) => {
    const value = e.target.value;
    setRepassword(value);
  };

  const validatePass = (password, repassword) => {
    const notice = { message: "", point: 0 };
    if (validateRequired(password) !== "") {
      notice.message = validateRequired(password);
      notice.point = 1;
    } else if (validatePassword(password) !== "") {
      notice.message = validatePassword(password);
      notice.point = 1;
    } else if (validateRequired(repassword) !== "") {
      notice.message = validateRequired(password);
      notice.point = 2;
    } else if (validatePassword(repassword) !== "") {
      notice.message = validatePassword(password);
      notice.point = 2;
    }
    return notice;
  };
  return (
    <div className="login">
      <Logo width="auto" height={50} className="logo-login" />
      <div className="form-group_reset">
        <h1>Reset Password</h1>
        <Input
          type="password"
          ref={refPass}
          labelName="Password"
          onChange={handleChange}
          value={password}
        />
        <Input
          type="password"
          ref={refConfirmpass}
          labelName="Password Confirm"
          onChange={handleChangeconfirm}
          value={repassword}
        />
        <button className="btn-login" onClick={handleSubmit}>
          {isLoading ? <LoadingOutlined /> : "Login"}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
