import React, { memo, useEffect, useState } from "react";
import { useGoogleLogin } from 'react-google-login';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../asset/css/Common.css";
import { loadSuccess } from "../../store/actions/common";
import { postEmailGoogle } from "../../store/actions/login";
import { TIME_CLOSE } from "./../../config/constants";
import { KEY_GOOGLE } from './../../config/index';

const LoginGoogle = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({profile:"",token:"" });
  const { signIn } = useGoogleLogin({
    clientId: KEY_GOOGLE,
    cookiePolicy:'single_host_origin',
    onSuccess: responseGoogle,
    onFailure: responseGoogle,
  });
  function responseGoogle(response){
    const profile = response.profileObj;
    const token = response.tokenId;
    const data = { profile, token };
    setData({ ...data });
  };

  const onSuccess = (message) => {
    history.push("/");
    toast.success(message, {
      autoClose: TIME_CLOSE,
    });
  };

  const onError = (message) => {
    toast.error(message, {
      autoClose: TIME_CLOSE,
    });
    dispatch(loadSuccess());
  };
  useEffect(() => {
    if (data.token) {
      dispatch(postEmailGoogle(data, onSuccess, onError));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data]);
  return (
    <div className="login-google">
          <button
            className="login_gg"
            onClick={signIn}
          >
            Login with Google
          </button>
    </div>
  );
};

export default memo(LoginGoogle);
