import { Input, Modal, Select } from "antd";
import { memo, useRef, useState } from "react";
import Button from "../../components/Add/Button";
import { validateRequired } from "../../helpers/validator";
import { ADMIN } from './../../config/constants';
import { useRole } from "./../../hooks/useAuthorization";
const { Option } = Select;

const EditDepartment = ({ visible, department, onCancel, onOk }) => {
  const isNotEdit = !useRole(ADMIN);
  const [departmentUpdate, setDepartmentUpdate] = useState({
    ...department,
    name: department.name,
  });
  const refName = useRef();
  const name = departmentUpdate.name;
  const handleChangeName = (value) => {
    setDepartmentUpdate({ ...departmentUpdate, name: value });
  };
  const handleSelectAssignee = (value) => {
    setDepartmentUpdate({ ...departmentUpdate, manager: { id: value } });
  };
  const handleSelectStatus = (value) => {
    setDepartmentUpdate({ ...departmentUpdate, status: value });
  };

  const handleUpdate = () => {
    const notice = validateRequire(name);
    if (notice.message === "") {
      if (isUpate()) {
        const data = dataDTO();
        onOk(data);
      }
      return;
    } else {
      alert(notice.message);
      refName.current.focus();
    }
  };

  const isUpate = () => {
    for (let i in department) {
      if (department[i] !== departmentUpdate[i]) return true;
    }
    return false;
  };

  const validateRequire = (name) => {
    const notice = { message: "" };
    if (validateRequired(name) !== "") {
      notice.message = validateRequired(name);
    }
    return notice;
  };
  function dataDTO() {
    return {
      id: departmentUpdate.id,
      name: departmentUpdate.name,
      status: departmentUpdate.status,
      id_manager:
        departmentUpdate.manager === null ? "" : departmentUpdate.manager.id,
    };
  }
  return (
    <>
      <Modal
        visible={visible}
        onOk={handleUpdate}
        onCancel={onCancel}
        footer={[
          <div className="btn-group" key={1}>
            {isNotEdit ? null : (
              <Button
                className="btn-update"
                key="update"
                onClick={handleUpdate}
                disabled={isNotEdit}
              >
                Update
              </Button>
            )}
            <Button className="btn-cancel" key="cancel" onClick={onCancel}>
              Cancel
            </Button>
          </div>,
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
              disabled={isNotEdit}
            />
          </div>

          <div className="rowAdd">
            <label>Assignee</label>
            <Select
              className="data_input"
              defaultValue={department.manager ? department.manager.id : ""}
              onSelect={handleSelectAssignee}
              disabled={isNotEdit}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              showSearch={true}
            >
              {department.users.map((user) => {
                return (
                  <Option key={user.id} value={user.id}>
                    {user.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="rowAdd">
            <label>Status</label>
            <Select
              className="data_input"
              defaultValue={department.status}
              onSelect={handleSelectStatus}
              disabled={isNotEdit}
            >
              <Option value={1}>Enable</Option>
              <Option value={0}>Disable</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </>
  );
};

EditDepartment.defaultProps = {
  department: {},
};

export default memo(EditDepartment);
