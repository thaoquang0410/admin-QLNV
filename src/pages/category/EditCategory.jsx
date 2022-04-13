import { Input, Modal, Select, Spin } from "antd";
import { memo, useRef, useState } from "react";
import Button from "../../components/Add/Button";
import { ADMIN } from "../../config/constants";
import { validateRequired } from "../../helpers/validator";
import { useRole } from './../../hooks/useAuthorization';
import { useLoading } from "./../../hooks/useLoading";
const { Option } = Select;

const EditCategory = ({ visible, assignees, category, onCancel, onOk }) => {
  const isNotEdit = !useRole(ADMIN);
  const { isUsers } = useLoading();
  const { users, ...rest } = category;
  const [categoryUpdate, setcategoryUpdate] = useState({
    ...rest,
    user_id: users.map((user) => user.id),
  });
  const name = categoryUpdate.name;
  const refName = useRef();
  const handleChangeName = (value) => {
    setcategoryUpdate({ ...categoryUpdate, name: value });
  };
  const handleSelectAssignee = (value) => {
    setcategoryUpdate({ ...categoryUpdate, user_id: [...value] });
  };
  const handleSelectStatus = (value) => {
    setcategoryUpdate({ ...categoryUpdate, status: value });
  };

  const handleUpdate = () => {
    const notice = validateRequire(name);
    if (notice.message === "") {
      if (isUpdate()) {
        onOk(categoryUpdate);
      } else {
        return;
      }
    } else {
      alert(notice.message);
      refName.current.focus();
    }
  };

  const isUpdate = () => {
    if (
      category.name !== categoryUpdate.name ||
      category.status !== categoryUpdate.status ||
      equalAssignee()
    ) {
      return true;
    }
    return false;
  };

  const equalAssignee = () => {
    if (category.user) {
      if (category.user_id.length !== categoryUpdate.user_id.length)
        return false;
      category.forEach((cate, index) => {
        if (cate !== categoryUpdate[index]) return false;
      });
    }
    return true;
  };

  const validateRequire = (name) => {
    const notice = { message: "" };
    if (validateRequired(name) !== "") {
      notice.message = validateRequired(name);
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
              <Spin spinning={isUsers}>
                <Button
                  className="btn-update"
                  key="update"
                  onClick={handleUpdate}
                  isNotEdit={isNotEdit}
                >
                  Update
                </Button>
              </Spin>
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
              value={categoryUpdate.name}
              ref={refName}
              onChange={(e) => handleChangeName(e.target.value)}
              disabled={isNotEdit}
            />
          </div>

          <div className="rowAdd">
            <label>Assignee</label>
            <Spin spinning={isUsers}>
              <Select
                className="data_input"
                showArrow
                mode="multiple"
                defaultValue={categoryUpdate.user_id}
                onChange={handleSelectAssignee}
                disabled={isNotEdit}
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
          <div className="rowAdd">
            <label>Status</label>
            <Select
              className="data_input"
              defaultValue={category.status}
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

export default memo(EditCategory);
