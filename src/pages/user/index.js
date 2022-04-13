import { Pagination } from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "../../asset/css/Input.css";
import { ADMIN, PAGE_SIZE } from "../../config/constants";
import { loading } from "../../store/actions/common";
import { getAllListDepartments } from "../../store/actions/departments";
import {
  getListRoles,
  getListUsers,
  postUser
} from "../../store/actions/users";
import { useRole } from "./../../hooks/useAuthorization";
import { useCondition } from './../../hooks/useCondition';
import { useLoading } from './../../hooks/useLoading';
import BtnAdd from "./BtnAdd";
import ListUser from "./ListUser";

export const User = () => {
  const dispatch = useDispatch();
  const isNotAdd = !useRole(ADMIN);
  const [filter, setFilter] = useState({
    page: 1,
    keyword: "",
    department: "",
  });
  const total = useSelector((state) => state.users.total);
  const users = useSelector((state) => state.users.users);
  const roles = useSelector((state) => state.users.roles);
  const { isLoading } = useLoading();
  const departments = useSelector((state) => state.departments.all);

  const { onSuccess, onError } = useCondition();
  const handleChangePage = (page) => {
    setFilter({
      ...filter,
      page: page
    });

  };

  const handleOk = (newUser) => {
    dispatch(loading());
    dispatch(postUser(newUser, onSuccess, onError));
  };
  const handleSearch = (keyword) => {
    setFilter({
      ...filter,
      keyword: keyword,
      page: 1
    });
  };

  const choiceDepartment = (_, filters) => {
    setFilter({
      ...filter,
      department: filters.department === null ? "" : filters.department[0]
    });
  };

  useEffect(() => {
    dispatch(loading());
    dispatch(getListUsers(filter, onSuccess, onError));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    dispatch(loading());
    dispatch(getListRoles(onSuccess, onError));
    dispatch(getAllListDepartments(onSuccess, onError));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="list">
      <div className="search-and-add">
        <Search
          placeholder="Search..."
          onSearch={handleSearch}
          style={{
            width: 400,
          }}
          loading={isLoading}
          allowClear={true}
        />
        {isNotAdd ? null : (
          <BtnAdd departments={departments} roles={roles} onOk={handleOk} />
        )}
      </div>
      <ListUser
        dataSource={users}
        roles={roles}
        departments={departments}
        onFilter={choiceDepartment}
        isLoading={isLoading}
        page={filter.page}
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
    </div>
  );
};
export default User;
