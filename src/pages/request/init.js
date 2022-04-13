/* eslint-disable jsx-a11y/anchor-is-valid */
import { Popconfirm, Space, Tag } from "antd";

export const initColumns = (handleClick, handleDelete, handleEdit, isData, isDispay) => {
  const colums = [
    {
      title: "Priority",
      key: "priority_id",
      dataIndex: "priority_id",
      render: (priority) => (
        <>
          <Tag style={{ width: 50, textAlign: "center" }} color={priority === "Normal" ? "green" : priority === "Low" ? "blue" : "red"}>{priority}</Tag>
        </>
      ),
    },
    {
      title: "Name Request",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      render: (text, record) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => handleClick(record.key)}>{text}</a>
      ),
    },
    {
      title: "Content Request",
      dataIndex: "content",
      key: "content",
      ellipsis: true
    },
    {
      title: "Author create",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Date create",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Due date",
      dataIndex: "due_date",
      key: "due_date",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Assignee",
      dataIndex: "operator_name",
      key: "operator_name",
    },
    {
      title: "Status",
      key: "status_id",
      dataIndex: "status_id",
      render: (status) => (
        <>
          <Tag style={{ width: 70, textAlign: "center" }} color={status === "Open" ? "#ff5c8d" : status === "Processing" ? "#00b4d8" : "#357c3c"}>{status}</Tag>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record) =>
        isData&&record.isEdit ? (
          <Space>
            <a onClick={() => handleEdit(record.key)}>Edit</a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];
  if (isDispay) {
    return colums;
  } else {
    colums.splice(3, 1);
    return colums;
  }
};

export const initFilter = {
  title: "",
  content: "",
  date: "",
  status: null,
  operator_id: null,
  user_id: null,
  category_id: null,
  department_id: null,
  priority: null,
  page: 1,
}
