import { Tag } from "antd";

export const initColumns = (handleClick, dataFilter) => {
  return [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 50,
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
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      width: 400,
    },
    {
      title: "Number of Employees",
      dataIndex: "number_of_personnel",
      key: "number_of_personnel",
      width: 90,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <>
          <Tag color={status === "Enable" ? "blue" : "red"}>{status}</Tag>
        </>
      ),
    },
  ];
};
