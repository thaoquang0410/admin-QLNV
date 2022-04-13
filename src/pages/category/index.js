import { Pagination } from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ADMIN, PAGE_SIZE } from "../../config/constants";
import {
  getListCategories,
  postCategory
} from "../../store/actions/categories";
import { loading } from "../../store/actions/common";
import { getAllAdmin } from "../../store/actions/users";
import { useRole } from "./../../hooks/useAuthorization";
import { useCondition } from "./../../hooks/useCondition";
import { useLoading } from "./../../hooks/useLoading";
import AddCateogory from "./AddCateogory";
import ListCategory from "./ListCategory";

export const Category = () => {
  const dispatch = useDispatch();
  const isNotAdd = !useRole(ADMIN);
  const [filter, setFilter] = useState({ page: 1, keyword: "" });
  const total = useSelector((state) => state.categories.total);
  const categories = useSelector((state) => state.categories.categories);
  const { isLoading } = useLoading();
  const users = useSelector((state) => state.users.admins);
  const { onSuccess, onError } = useCondition();

  const handleChangePage = (page) => {
    setFilter({
      ...filter,
      page: page,
    });
  };

  const handleClickAdd = () => {
    if (Object.keys(users).length === 0) {
      dispatch(getAllAdmin(onSuccess, onError));
      dispatch(loading());
    }
  };

  const handleOk = (newCategory) => {
    dispatch(loading());
    dispatch(postCategory(newCategory, onSuccess, onError));
  };

  const handleSearch = (keyword) => {
    dispatch(loading());
    setFilter({
      ...filter,
      keyword: keyword,
      page: 1,
    });
  };

  useEffect(() => {
    dispatch(loading());
    dispatch(getListCategories(filter, onSuccess, onError));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <div className="list">
      <div className="search-and-add">
        <Search
          placeholder="Search..."
          onSearch={handleSearch}
          style={{ width: 400 }}
          loading={isLoading}
          allowClear={true}
        />
        {isNotAdd ? null : (
          <AddCateogory
            assignees={users}
            onOk={handleOk}
            onClickAdd={handleClickAdd}
          />
        )}
      </div>
      <ListCategory
        dataSource={categories}
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
export default Category;
