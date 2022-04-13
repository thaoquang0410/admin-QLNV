import { Select,Tag } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  const color = ["","#ff5c8d","#00b4d8","#357c3c","#b3541e"]
  const onPreventMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={color[value]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}


const SelectStatus = ({ onSelect, defaultValue, className, value, multiple, disabled }) => {
  const colors = [
    "status-open",
    "status-processing",
    "status-closed",
  ];
  const [status, setStatus] = useState(()=> multiple?value===null?[]:[...value]:defaultValue);

  const handleStatus = (value) => {
    onSelect(value);
    setStatus(value);
  };

  const nameClass = ` ${className} ${colors[status - 1]}`;

  useEffect(()=>{
    if(value===null){
      setStatus([]);
    }
  },[value])
  return (
    <Select
      allowClear={multiple}
      className={nameClass}
      tagRender={multiple?tagRender:""}
      mode={multiple?"multiple":""}
      onChange={handleStatus}
      placeholder="Status"
      defaultValue={defaultValue}
      value={status}
      disabled={disabled}
    >
      <Option key={1} value={1}>
        Open
      </Option>
      <Option key={2} value={2}>
        Processing
      </Option>
      <Option key={3} value={3}>
        Close
      </Option>
    </Select>
  );
};

SelectStatus.defaultProps = {
  defaultValue: null,
  className: "",
  placeholder: "",
  multiple: false
};

export default SelectStatus;
