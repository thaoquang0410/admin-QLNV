import { Table } from "antd";
import 'antd/dist/antd.min.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { putCategory } from "../../store/actions/categories";
import { loading } from "../../store/actions/common";
import { getAllAdmin } from "../../store/actions/users";
import { useCondition } from './../../hooks/useCondition';
import EditCategory from "./EditCategory";
import { initColumns } from "./init";

const ListCategory = ({ dataSource, isLoading, page }) => {
  const data = convertData(dataSource);
  const [category, setCategory] = useState({});
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const assignees = useSelector((state) => state.users.admins);
  const { onSuccess, onError } = useCondition();

  const handleClick = (key) => {
    const category = getByKey(key);
    setCategory({ ...category });
    setVisible(true);
    if (Object.keys(assignees).length === 0) {
      dispatch(loading());
      dispatch(getAllAdmin(onSuccess, onError));
    }
  };

  const handleOk = (categoryUpdate) => {
    setVisible(!visible);
    setCategory({});
    dispatch(loading());
    dispatch(putCategory(categoryUpdate, onSuccess, onError))
  };

  const handleCancel = () => {
    setVisible(!visible);
    setCategory({});
  };

  const columns = initColumns(handleClick);
  const getByKey = (key) => {
    const category = dataSource.find((category) => {
      return category.id === key;
    });
    return category;
  };

  function convertData(data) {
    const dataConvert = data.map((category, index) => {
      return {
        key: category.id,
        stt: 10 * (page - 1) + index + 1,
        name: category.name,
        assignee: category.users.map((user) => {
          return user.name;
        }).join(", "),
        status: category.status === 1 ? "Enable" : "Disable",
      };
    });
    return dataConvert;
  }

  return (
    <div className="table-list">
      {Object.keys(category).length !== 0 && (
        <EditCategory
          visible={visible}
          category={category}
          assignees={assignees}
          onCancel={handleCancel}
          onOk={handleOk}
        />
      )}
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        pagination={false}
        loading={isLoading}
      />
    </div>
  );
};

export default ListCategory;
