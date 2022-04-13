import React from "react";
import { Table } from "antd";
import "antd/dist/antd.min.css";
import { initColumns } from "./init";
import { convertDate } from "../../helpers/convertDate";
import { useSelector } from "react-redux";
import DetailRequest from "./DetailRequest";
import { useState } from "react";
import { useRole } from "./../../hooks/useAuthorization";
import { ADMIN, USER } from "./../../config/constants";

const ListRequest = ({ dataSource, isLoading, onEdit, onDelete }) => {
	const roleAdmin = useRole(ADMIN);
  const roleUser = useRole(USER);
	const myId = useSelector((state) => state.common.account.id);
  const isDisplay = useSelector((state) => state.common.displayColumnAuthor);
  const data = convertData(dataSource);
  const [request, setRequest] = useState({ id: "", status: "", priority: "" });
  const [visible, setVisible] = useState(false);

  const handleClick = (key) => {
    const request = getByKey(key);
    setRequest({ ...request });
    setVisible(true);
  };
  const handleClose = () => setVisible(false);
  const handleDelete = (key) => {
    onDelete(key);
  };
  const handleEdit = (key) => {
    const request = getByKey(key);
    onEdit(request);
  };

  const isData = dataSource.length > 0;
  const columns = initColumns(
    handleClick,
    handleDelete,
    handleEdit,
    isData,
    isDisplay
  );

  const getByKey = (key) => {
    const request = dataSource.find((request) => {
      return request.id === key;
    });
    return request;
  };
  function mapStatus(id = 0) {
    const status = ["", "Open", "Processing", "Closed"];
    return status[id];
  }
  function mapPriority(id = 0) {
    const priority = ["", "Low", "Normal", "Hight"];
    return priority[id];
  }

  function convertData(data) {
    const dataConvert = data.map((request) => {
      return {
        key: request.id,
        priority_id: mapPriority(request.priority_id),
        title: request.title,
        content: request.content,
        operator_name: request.operator_name,
        date: convertDate(request.date),
        due_date: convertDate(
          request.due_date ? request.due_date : request.date
        ),
        category_name: request.category_name,
        user_name: request.user_name,
        status_id: mapStatus(request.status_id),
        isEdit:
          roleAdmin ||
          (roleUser && request.status_id === 1 && request.user_id === myId),
      };
    });
    return dataConvert;
  }

  return (
    <div className="table-list">
      <Table
        columns={columns}
        dataSource={data}
        size="small"
        pagination={false}
        loading={isLoading}
      />
      {visible ? (
        <DetailRequest
          request={request}
          onClose={handleClose}
          onEdit={onEdit}
        />
      ) : null}
    </div>
  );
};

export default ListRequest;
