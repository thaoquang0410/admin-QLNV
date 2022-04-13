import { Table } from "antd";
import 'antd/dist/antd.min.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { loading } from "../../store/actions/common";
import { putDepartment } from "../../store/actions/departments";
import { useCondition } from './../../hooks/useCondition';
import EditDepartment from "./EditDepartment";
import { initColumns } from "./init";


const ListDepartment = ({ dataSource, isLoading, page }) => {
  const data = convertData(dataSource);
  const [department, setDepartment] = useState({});
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const { onSuccess, onError } = useCondition();

  const handleClick = (key) => {
    const department = getByKey(key);
    setDepartment({ ...department });
    setVisible(true);
  };

  const handleOk = (departmentUpdate) => {
    dispatch(loading())
    setVisible(!visible);
    setDepartment({});
    dispatch(putDepartment(departmentUpdate, onSuccess, onError))
  };

  const handleCancel = () => {
    setVisible(!visible);
    setDepartment({});
  };

  const columns = initColumns(handleClick);

  const getByKey = (key) => {
    const department = dataSource.find((department) => {
      return department.id === key;
    });
    return department;
  };

  function convertData(data) {
    const dataConvert = data.map((department, index) => {
      return {
        key: department.id,
        stt: 10 * (page - 1) + index + 1,
        name: department.name,
        assignee: department.manager === null ? "" : department.manager.name,
        number_of_personnel: department.number_of_personnel,
        status: department.status === 1 ? "Enable" : "Disable"
      };
    });
    return dataConvert;
  }

  return (
    <div className="table-list">
      {Object.keys(department).length !== 0 && (
        <EditDepartment
          visible={visible}
          department={department}
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

export default ListDepartment;
