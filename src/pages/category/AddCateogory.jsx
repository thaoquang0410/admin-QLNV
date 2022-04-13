import { Input, Modal, Select, Spin } from "antd";
import { memo, useState } from "react";
import Button from "../../components/Add/Button";
import { useLoading } from "./../../hooks/useLoading";
import { validateRequired } from "../../helpers/validator";
import { useRef } from "react";
const { Option } = Select;

const AddCategory = ({ assignees, onOk, onClickAdd }) => {
  const [categoryUpdate, setCategoryUpdate] = useState({ user_id: [], name: '' });
  const [visible, setVisible] = useState(false);
  const { isUsers } = useLoading();
  const refName = useRef();
  const name = categoryUpdate.name;
  const handleChangeName = (value) => {
    setCategoryUpdate({ ...categoryUpdate, name: value });
  };
  const handleSelectAssignee = (value) => {
    setCategoryUpdate({ ...categoryUpdate, user_id: [...value] });
  };

  const handleUpdate = (visible) => {
    const notice = validateRequire(name);
    if (notice.message === '') {
      onOk(categoryUpdate);
      setVisible(!visible);
    } else {
      alert(notice.message);
      refName.current.focus();
    }

  };

  const showModal = () => {
    setVisible(true);
    onClickAdd();
  };
  const onCancel = (visible) => {
    setVisible(!visible);
  };

  const validateRequire = (name) => {
    const notice = { message: "" };
    if (validateRequired(name) !== "") {
      notice.message = validateRequired(name);
    }
    return notice;
  }
  return (
    <>
      <Button className="btn-add" onClick={showModal}>
        ADD
      </Button>
      <Modal
        visible={visible}
        onOk={handleUpdate}
        onCancel={onCancel}
        footer={[
          <Spin key="update" spinning={isUsers}>
            <Button className="btn-update" onClick={handleUpdate}>
              Add
            </Button>
          </Spin>,
          <Button className="btn-cancel" key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
        ]}
      >
        <div style={{ paddingTop: "40px" }}>
          <div className="rowAdd">
            <label>Name</label>
            <Input
              className="data_input"
              placeholder="Name"
              ref={refName}
              value={categoryUpdate.name}
              onChange={(e) => handleChangeName(e.target.value)}
            />
          </div>
          <div className="rowAdd">
            <label>Assignee</label>
            <Spin spinning={isUsers} >
              <Select
                mode="multiple"
                showArrow
                className="data_input"
                onChange={handleSelectAssignee}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
                showSearch={true}
              >
                {assignees.map((assignee) => {
                  return (
                    <Option key={assignee.id} value={assignee.id}>
                      {assignee.name}
                    </Option>
                  );
                })}
              </Select>
            </Spin>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(AddCategory);
