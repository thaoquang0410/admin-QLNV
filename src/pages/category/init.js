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
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 100,
      render: (status) => (
        <>
            <Tag color={status==="Enable" ? "blue" : "red"}>
              {status}
            </Tag>
        </>
      ),
    },
  ];
};
