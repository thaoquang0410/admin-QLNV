import { useRef, useState } from "react";
import Input from "../../components/Input/Input";
import { useDispatch } from "react-redux";
import { postEmail } from "../../store/actions/login";
import { Link, useHistory } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import LoginGoogle from "./LoginGoogle";
import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../helpers/validator";
import { loading, loadSuccess } from "../../store/actions/common";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TIME_CLOSE } from './../../config/constants';
import { useLoading } from './../../hooks/useLoading';
import { getToken } from "../../helpers/storage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading } = useLoading();
  const dispatch = useDispatch();
  const history = useHistory();
  const refEmail = useRef();
  const refPass = useRef();

  const handleSubmit = () => {
    dispatch(loading());
    const notice = validateEmailPassword(email, password);
    if (notice.message === "") {
      const value = { email, password };
      dispatch(postEmail(value, onSuccess, onError));
    } else {
      alert(notice.message);
      if (notice.point === 1) {
        refEmail.current.focus();
      } else {
        refPass.current.focus();
      }
    }
  };

  const validateEmailPassword = (email, password) => {
    const notice = { message: "", point: 0 };
    if (validateRequired(email) !== "") {
      notice.message = validateRequired(email);
      notice.point = 1;
    } else if (validateEmail(email) !== "") {
      notice.message = validateEmail(email);
      notice.point = 1;
    } else if (validateRequired(password) !== "") {
      notice.message = validateRequired(password);
      notice.point = 2;
    } else if (validatePassword(password) !== "") {
      notice.message = validatePassword(password);
      notice.point = 2;
    }
    return notice;
  };

  const onSuccess = (message) => {
    if (getToken() !== "") {
      history.push("/");
      toast.success((message), {
        autoClose: TIME_CLOSE
      })
      dispatch(loadSuccess());
    }
  };

  const onError = (message) => {
    toast.error(message, {
      autoClose: TIME_CLOSE,
    });
    dispatch(loadSuccess());
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const value = e.target.value;
    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="form-group">
      <h1>Login</h1>
      <Input
        type="email"
        ref={refEmail}
        labelName="Email"
        onChange={handleChange}
        value={email}
      />
      <Input
        type="password"
        ref={refPass}
        labelName="Password"
        onChange={handleChange}
        value={password}
      />
      <div className="forgot-pass">
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
      <button className="btn-login" onClick={handleSubmit}>
        {isLoading ? <LoadingOutlined /> : "Login"}
      </button>
      <LoginGoogle />
    </div>
  );
};

export default LoginForm;
