import React, { useEffect, useState } from "react";
import HistoryRequest from "../../components/Request/HistoryRequest";
import TotalStatus from "../../components/Request/TotalStatus";
import "../../asset/css/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getHistories } from "../../store/actions/comments";
import { useCondition } from "./../../hooks/useCondition";


const Home = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { onSuccess, onError } = useCondition();
  const comments = useSelector((state) => state.comments.histories);
  const total = useSelector((state) => state.comments.totalH);

  const handleChangePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(getHistories(page, onSuccess, onError));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="home_page">
      <div className="home_history">
        <HistoryRequest
          page={page}
          total={total}
          comments={comments}
          onChange={handleChangePage}
        />
      </div>
      <div className="home_status">
        <TotalStatus />
      </div>
    </div>
  );
};
export default Home;
