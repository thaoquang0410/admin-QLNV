import { Input, Modal } from "antd";
import { useRef } from "react";
import { memo, useState } from "react";
import Button from "../../components/Add/Button";
import { validateRequired } from "../../helpers/validator";
const AddDepartment = ({ onOk }) => {
  const [departmentUpdate, setDepartmentUpdate] = useState({ name: "" });
  const [visible, setVisible] = useState(false);
  const refName = useRef();
  const name = departmentUpdate.name;
  const handleChangeName = (value) => {
    setDepartmentUpdate({ ...departmentUpdate, name: value });
  };
  const handleUpdate = (visible) => {
    const notice = validateRequire(name);
    if (notice.message === '') {
      setVisible(!visible);
      onOk(departmentUpdate);
    }
    else {
      alert(notice.message);
      refName.current.focus();
    }
  };

  const showModal = () => {
    setVisible(true);
  };
  const onCancel = (visible) => {
    setVisible(!visible);
  };

  const validateRequire = (name) => {
    const notice = { message: "" }
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
          <Button className="btn-update" key="update" onClick={handleUpdate}>
            Add
          </Button>,
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
              value={departmentUpdate.name}
              onChange={(e) => handleChangeName(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(AddDepartment);
