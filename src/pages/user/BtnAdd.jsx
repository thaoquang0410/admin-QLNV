import { Input, Modal, Select, Spin } from "antd";
import React, { memo, useState } from "react";
import "../../asset/css/Add.css";
import Button from "../../components/Add/Button";
import { useLoading } from "./../../hooks/useLoading";
import { validateRequired, validateEmail, validatePassword } from "../../helpers/validator";
import { useRef } from "react";
const { Option } = Select;

const BtnAdd = ({ roles, departments, onOk }) => {
  const [userUpdate, setUserUpdate] = useState({
    department_id: 1,
    role_id: 1,
    active: 1,
    name: '',
    email: '',
    password: ''
  });
  const [visible, setVisible] = useState(false);
  const { isRoles, isDepartments } = useLoading();
  const isPress = isRoles && isDepartments;
  const name = userUpdate.name;
  const email = userUpdate.email;
  const password = userUpdate.password;
  const refName = useRef();
  const refEmail = useRef();
  const refPass = useRef();
  const handleChangeName = (value) => {
    setUserUpdate({ ...userUpdate, name: value });
  };
  const handleSelectDept = (value) => {
    setUserUpdate({ ...userUpdate, department_id: value });
  };
  const handleSelectRole = (value) => {
    setUserUpdate({ ...userUpdate, role_id: value });
  };
  
  const handleChangeEmail = (value) => {
    setUserUpdate({ ...userUpdate, email: value });
  };
  const handleChangePassword = (value) => {
    setUserUpdate({ ...userUpdate, password: value });
  };

  const handleUpdate = (visible) => {
    const notice = validateRequire(name, email, password);
    if (notice.message === '') {
      onOk(userUpdate);
      setVisible(!visible);
    } else {
      alert(notice.message);
      if (notice.point === 1) {
        refName.current.focus();
      } else if (notice.point === 2) {
        refEmail.current.focus();
      } else if (notice.point === 3) {
        refPass.current.focus();
      }
    }

  };
  const validateRequire = (name, email, password) => {
    const notice = { message: "", point: 0 }
    if (validateRequired(name) !== '') {
      notice.message = validateRequired(name)
      notice.point = 1;
    } else if (validateRequired(email) !== '') {
      notice.message = validateRequired(email);
      notice.point = 2;
    } else if (validateEmail(email) !== '') {
      notice.message = validateEmail(email);
      notice.point = 2;
    } else if (validateRequired(password) !== '') {
      notice.message = validateRequired(password)
      notice.point = 3;
    } else if (validatePassword(password) !== "") {
      notice.message = validatePassword(password);
      notice.point = 3;
    }
    return notice;
  }
  const showModal = () => {
    setVisible(true);
  };
  const onCancel = (visible) => {
    setVisible(!visible);
  };
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
          <Spin spinning={isPress} key="update">
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
              value={userUpdate.name}
              ref={refName}
              onChange={(e) => handleChangeName(e.target.value)}
            />
          </div>
          <div className="rowAdd">
            <label>Email</label>
            <Input
              className="data_input"
              type="email"
              placeholder="Email"
              ref={refEmail}
              value={userUpdate.email}
              onChange={(e) => handleChangeEmail(e.target.value)}
            />
          </div>
          <div className="rowAdd">
            <label>Password</label>
            <Input.Password
              className="data_input"
              ref={refPass}
              placeholder="Password"
              value={userUpdate.password}
              onChange={(e) => handleChangePassword(e.target.value)}
            />
          </div>
          <div className="rowAdd">
            <label>Department</label>
            {/* <Spin spinning={isDepartments}> */}
            <Select className="data_input" onSelect={handleSelectDept} defaultValue={1}>
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
              <Select className="data_input" onSelect={handleSelectRole} defaultValue={1}>
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
        </div>
      </Modal>
    </>
  );
};

export default memo(BtnAdd);
