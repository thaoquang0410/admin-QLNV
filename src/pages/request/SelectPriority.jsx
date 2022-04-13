import { Select, Tag } from "antd";
import { useState, useEffect } from "react";

const { Option } = Select;

function tagRender(props) {
  const { label, value, closable, onClose } = props;
  const color = ["","blue","green","red"]
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

const SelectPriority = ({ onSelect, defaultValue, className,value, multiple, disabled }) => {
  const colors = [
    "priority-low",
    "priority-normal",
    "priority-hight",
  ];
  const [priority, setPriority] = useState(()=> multiple?value===null?[]:[...value]:defaultValue);

  const handlePriority = (value) => {
    onSelect(value);
    setPriority(value);
  };

  useEffect(()=>{
    if(value===null){
      setPriority([]);
    }
  },[value])
  const nameClass = ` ${className} ${colors[priority - 1]}`;

  return (
    <Select
      allowClear={multiple}
      className={nameClass}
      tagRender={multiple?tagRender:""}
      mode={multiple?"multiple":""}
      onChange={handlePriority}
      placeholder="Priority"
      defaultValue={defaultValue}
      value={priority}
      disabled={disabled}
    >
      <Option key={1} value={1}>
        Low
      </Option>
      <Option key={2} value={2}>
        Normal
      </Option>
      <Option key={3} value={3}>
        Hight
      </Option>
    </Select>
  );
};

SelectPriority.defaultProps = {
  defaultValue: null,
  className: "",
  placeholder: "",
  multiple: false,
  disabled: false
};

export default SelectPriority;
