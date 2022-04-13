import { Input, Modal, Select, Spin } from "antd";
import { memo, useRef, useState } from "react";
import "../../asset/css/Add.css";
import Button from "../../components/Add/Button";
import { ADMIN } from "../../config/constants";
import { validatePassword, validateRequired } from "../../helpers/validator";
import { useRole } from "./../../hooks/useAuthorization";
import { useLoading } from "./../../hooks/useLoading";
const { Option } = Select;

const EditUser = ({ visible, user, roles, departments, onCancel, onOk }) => {
  const isNotEdit = !useRole(ADMIN);
  const [userUpdate, setUserUpdate] = useState({ ...user });
  const { isRoles, isDepartments } = useLoading();
  const isPress = isRoles && isDepartments;
  const refName = useRef();
  const refPass = useRef();
  const name = userUpdate.name;
  const password = userUpdate.password;
  const handleChangeName = (value) => {
    setUserUpdate({ ...userUpdate, name: value });
  };
  const handleSelectDept = (value) => {
    setUserUpdate({ ...userUpdate, department_id: value });
  };
  const handleSelectRole = (value) => {
    setUserUpdate({ ...userUpdate, role_id: value });
  };
  const handleSelectStatus = (value) => {
    setUserUpdate({ ...userUpdate, active: value });
  };
  const handleChangePassword = (value) => {
    setUserUpdate({ ...userUpdate, password: value });
  };

  const handleUpdate = () => {
    const notice = validateRequire(name, password);
    if (notice.message === "") {
      if (isUpdate()) {
        onOk(userUpdate);
      }
      return;
    } else {
      alert(notice.message);
      if (notice.point === 1) {
        refName.current.focus();
      } else if (notice.point === 2) {
        refPass.current.focus();
      }
    }
  };

  const isUpdate = () => {
    for (let i in user) {
      if (user[i] !== userUpdate[i]) return true;
    }
    return false;
  };

  const validateRequire = (name, password) => {
    const notice = { message: "", point: 0 };
    if (validateRequired(name) !== "") {
      notice.message = validateRequired(name);
      notice.point = 1;
    } else if (password && validatePassword(password) !== "") {
      notice.message = validatePassword(password);
      notice.point = 2;
    }
    return notice;
  };

  return (
    <>
      <Modal
        visible={visible}
        onOk={handleUpdate}
        onCancel={onCancel}
        footer={[
          <div className="btn-group" key={1}>
            {isNotEdit ? null : (
              <Spin spinning={isPress}>
                <Button
                  className="btn-update"
                  onClick={handleUpdate}
                  disabled={isNotEdit}
                  isNotEdit={isNotEdit}
                >
                  Update
                </Button>
              </Spin>
            )}
            <Button className="btn-cancel" onClick={onCancel}>
              Cancel
            </Button>
          </div>,
        ]}
      >
        <div style={{ paddingTop: "40px" }}>
          <div className="rowAdd">
            <label>Mã NV</label>
            <Input className="data_input" value={userUpdate.id} disabled />
          </div>
          <div className="rowAdd">
            <label>Name</label>
            <Input
              className="data_input"
              placeholder="Name"
              ref={refName}
              value={userUpdate.name}
              onChange={(e) => handleChangeName(e.target.value)}
              disabled={isNotEdit}
            />
          </div>
          <div className="rowAdd">
            <label>Email</label>
            <Input
              className="data_input"
              type="email"
              disabled
              placeholder="Email"
              value={userUpdate.email}
            />
          </div>
          <div className="rowAdd">
            <label>Password</label>
            <Input.Password
              className="data_input"
              placeholder="Password"
              value={userUpdate.password}
              ref={refPass}
              onChange={(e) => handleChangePassword(e.target.value)}
            />
          </div>
          <div className="rowAdd">
            <label>Department</label>
            {/* <Spin spinning={isDepartments}> */}
            <Select
              className="data_input"
              defaultValue={userUpdate.department_id}
              onSelect={handleSelectDept}
              disabled={isNotEdit}
            >
              {departments.map((department) => {
                return (
                  <Option key={department.id} value={department.id}>
                    {department.name}
                  </Option>
                );
              })}
            </Select>
            {/* </Spin> */}
          </div>
          <div className="rowAdd">
            <label>Role</label>
            <Spin spinning={isRoles}>
              <Select
                className="data_input"
                defaultValue={userUpdate.role_id}
                onSelect={handleSelectRole}
                disabled={isNotEdit}
              >
                {roles.map((role) => {
                  return (
                    <Option key={role.id} value={role.id}>
                      {role.name}
                    </Option>
                  );
                })}
              </Select>
            </Spin>
          </div>
          <div className="rowAdd">
            <label>Status</label>
            <Select
              className="data_input"
              defaultValue={userUpdate.active}
              onSelect={handleSelectStatus}
              disabled={isNotEdit}
            >
              <Option value={1}>Active</Option>
              <Option value={0}>Inactive</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(EditUser);
