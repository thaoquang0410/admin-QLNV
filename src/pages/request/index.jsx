import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PAGE_SIZE } from "../../config/constants";
import { getAllCategories } from "../../store/actions/categories";
import { displayAuthor, hideAuthor, loading } from "../../store/actions/common";
import { getAllListDepartments } from "../../store/actions/departments";
import { deleteRequest, getListRequests } from "../../store/actions/requests";
import { getAllAdmin } from "../../store/actions/users";
import { useCondition } from "./../../hooks/useCondition";
import ContentRequest from "./ContentRequest";
import FormRequest from "./FormRequest";
import { initFilter } from "./init";

const Request = () => {
  const [action, setAction] = useState("content");
  const [request, setRequest] = useState({});
  const requests = useSelector((state) => state.requests.requests);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.admins);
  const myId = useSelector((state) => state.common.account.id);
  const categories = useSelector((state) => state.categories.all);
  const departments = useSelector((state) => state.departments.all);
  const [filter, setFilter] = useState(initFilter);
  const total = useSelector((state) => state.requests.total);
  const { onSuccess, onError } = useCondition();
  const [toggle, setToggle] = useState(false);
  const [isMy, setIsMy] = useState(false);
  
  const handleChangePage = (page) => {
    setFilter({
      ...filter,
      page: page,
    });
  };

  const handleFilter = (filterUpdate) => {
    dispatch(displayAuthor());
    dispatch(loading());
    setFilter({ ...filterUpdate, page: 1 });
  };

  const handleMyRequest = (isMy) => {
    if(!isMy){
      setFilter({ ...filter, user_id: myId, page: 1 });
      dispatch(hideAuthor());
    }else{
      setFilter({ ...filter, user_id: "", page: 1 });
      dispatch(displayAuthor());
    }
    setIsMy(!isMy);
  };

  const ToggleFilter = () => {
    setToggle(!toggle);
    if (!toggle) {
      if (Object.keys(users).length === 0) {
        dispatch(loading());
        dispatch(getAllAdmin(onSuccess, onError));
      }
      if (Object.keys(categories).length === 0) {
        dispatch(loading());
        dispatch(getAllCategories(onSuccess, onError));
      }
      if (Object.keys(departments).length === 0) {
        dispatch(loading());
        dispatch(getAllListDepartments(onSuccess, onError));
      }
    }
  };

  const editRequest = (request) => {
    setRequest({ ...request });
    setAction("edit");
    if (Object.keys(users).length === 0) {
      dispatch(loading());
      dispatch(getAllAdmin(onSuccess, onError));
    }
    if (Object.keys(categories).length === 0) {
      dispatch(loading());
      dispatch(getAllCategories(onSuccess, onError));
    }
    if (Object.keys(departments).length === 0) {
      dispatch(loading());
      dispatch(getAllListDepartments(onSuccess, onError));
    }
  };
  const deleteReq = (id) => {
    dispatch(deleteRequest(id,onDeleteSuccess, onError));
  };
  const onDeleteSuccess = () => {
    dispatch(getListRequests(filter, onSuccess, onError));
  };
  const createRequest = () => {
    setAction("create");
    if (Object.keys(users).length === 0) {
      dispatch(loading());
      dispatch(getAllAdmin(onSuccess, onError));
    }
    if (Object.keys(categories).length === 0) {
      dispatch(loading());
      dispatch(getAllCategories(onSuccess, onError));
    }
  };
  const back = () => {
    setAction("content");
  };
  const conditionDisplay = (action) => {
    // eslint-disable-next-line default-case
    switch (action) {
      case "content":
        return (
          <>
            <ContentRequest
              editRequest={editRequest}
              deleteReq={deleteReq}
              createRequest={createRequest}
              onClickFilter={ToggleFilter}
              filter={filter}
              myRequest={handleMyRequest}
              isMy={isMy}
              users={users}
              categories={categories}
              departments={departments}
              onFilter={handleFilter}
              requests={requests}
            />
            <div className="paging-list">
              <Pagination
                defaultCurrent={1}
                total={total}
                pageSize={PAGE_SIZE}
                current={filter.page}
                showSizeChanger={false}
                onChange={handleChangePage}
                hideOnSinglePage
              />
            </div>
          </>
        );
      case "edit":
        return (
            categories.length>0 && <FormRequest
            labelName="Update Request"
            request={request}
            onBack={back}
            categories={categories}
            myId={myId}
          />
          
        );
      case "create":
        return (
          categories.length>0 && <FormRequest
            labelName="Create Request"
            onBack={back}
            categories={categories}
            myId={myId}
          />
        );
    }
  };

  const display = conditionDisplay(action);
  useEffect(() => {
    dispatch(getListRequests(filter, onSuccess, onError));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return <div className="request">{display}</div>;
};

export default Request;
