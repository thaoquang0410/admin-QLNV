import { Tag } from 'antd';

export const initColumns = (handleClick, dataFilter) => {
  return [
    {
      title: "Ma NV",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => handleClick(record.key)}>{text}</a>
      ),
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      width:250
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: dataFilter,
      filterMultiple: false,
      filterSearch: true,
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <>
          <Tag color={status === "Active" ? "blue" : "red"}>{status}</Tag>
        </>
      ),
    },
  ];
};
