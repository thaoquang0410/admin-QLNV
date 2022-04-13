import { Pagination } from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { PAGE_SIZE } from "../../config/constants";
import { loading } from "../../store/actions/common";
import { getListDepartments, postDepartment } from "../../store/actions/departments";
import { ADMIN } from './../../config/constants';
import { useRole } from './../../hooks/useAuthorization';
import { useCondition } from './../../hooks/useCondition';
import { useLoading } from './../../hooks/useLoading';
import AddDepartment from "./AddDepartment";
import ListDepartment from "./ListDepartment";


export const Department = () => {
  const dispatch = useDispatch();
  const isNotAdd = !useRole(ADMIN);
  const [filter, setFilter] = useState({ page: 1, keyword: "" });
  const total = useSelector((state) => state.departments.total);
  const departments = useSelector((state) => state.departments.departments);
  const { isLoading } = useLoading();
  const { onSuccess, onError } = useCondition();
  const handleChangePage = (page) => {
    setFilter({
      ...filter,
      page: page,
    });
  };
  const handleSearch = (keyword) => {
    dispatch(loading());
    setFilter({
      ...filter,
      keyword: keyword,
      page: 1
    });
  };

  const handleOk = (newDepartment) => {
    dispatch(loading());
    dispatch(postDepartment(newDepartment, onSuccess, onError));
  }


  useEffect(() => {
    dispatch(loading());
    dispatch(getListDepartments(filter, onSuccess, onError));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
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
        {isNotAdd ? null : <AddDepartment
          onOk={handleOk} department={departments}
        />}
      </div>
      <ListDepartment dataSource={departments} isLoading={isLoading} page={filter.page} />
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
export default Department;
