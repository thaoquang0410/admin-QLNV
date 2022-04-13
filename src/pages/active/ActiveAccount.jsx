import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../asset/css/UserActive.css";
import Active from "../../asset/images/user_active.png";
import axios from "axios";
import { BASE_API_URL } from "../../config";

export default function UserActive() {
  const { id, token } = useParams();
  const [actived, setActived] = useState(false);
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/actived/${id}/${token}`)
      .then(() => {
        setActived(true);
      })
      .catch(() => {
        setActived(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="home_active">
      {!actived && <h1>Tài khoản chưa được kích hoạt</h1>}
      {actived && <>
        <h1>Tài khoản đã được kích hoạt</h1>
      <img src={Active} width={300} height={300} alt="active" />
      <div className="text_active">
        Tài khoản của bạn đã được kích hoạt xong. Vui lòng trở về trang login để
        đăng nhập
      </div>
      </>}
      <div>
        <Link to="/login" className="back_login">
          Back to login
        </Link>
      </div>
    </div>
  );
}
