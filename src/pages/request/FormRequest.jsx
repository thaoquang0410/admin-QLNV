import { Input, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../components/Add/Button";
import { useRole } from "../../hooks/useAuthorization";
import { loading, loadSuccess } from "../../store/actions/common";
import { postRequest, putRequest } from "../../store/actions/requests";
import { ADMIN, TIME_CLOSE } from "./../../config/constants";
import { convertDateInput } from "./../../helpers/convertDate";
import { useCondition } from "./../../hooks/useCondition";
import { useEdit } from "./../../hooks/useEdit";
import { useLoading } from "./../../hooks/useLoading";
import SelectPriority from "./SelectPriority";
import SelectStatus from "./SelectStatus";

const FormRequest = ({ labelName, request, categories, onBack, myId }) => {
  const [requestForm, setRequestForm] = useState({ ...request });
  const { isCategories, isUsers } = useLoading("request");
  const isPress = isCategories && isUsers;
  const [assignees, setAssignees] = useState([]);
  const [assignee, setAssignee] = useState({
    id: request.operator_id,
    first: true,
  });
  const dispatch = useDispatch();
  const { onError } = useCondition();
  const roleAdmin = useRole(ADMIN);
  const isEdit = useEdit(request.status_id, request.user_id, myId, labelName);

  const handleSelectAssignee = (value) => {
    setAssignee({ id: value });
    setRequestForm({ ...requestForm, operator_id: value });
  };
  const handleSelectCategory = (value) => {
    setRequestForm({ ...requestForm, category_id: value });
  };

  const handleSelectStatus = (value) => {
    setRequestForm({ ...requestForm, status_id: value });
  };
  const handleSelectPriority = (value) => {
    setRequestForm({ ...requestForm, priority_id: value });
  };
  const handleChangeName = (value) => {
    setRequestForm({ ...requestForm, title: value });
  };
  const handleChangeContent = (value) => {
    setRequestForm({ ...requestForm, content: value });
  };
  const handleChangeDate = (value) => {
    setRequestForm({ ...requestForm, due_date: value });
  };
  const handleCreate = () => {
    dispatch(loading());
    dispatch(postRequest(requestForm, onSuccess, onError));
  };
  const handleUpdate = () => {
    if (isUpdate()) {
      dispatch(loading());
      dispatch(putRequest(requestForm, onSuccess, onError));
    } else {
      onBack();
    }
  };

  const loadAssignee = (value) => {
    if (!assignee.first) {
      setAssignee({ id: "", first: false });
    } else {
      setAssignee({ ...assignee, first: false });
      setRequestForm({...requestForm, operator_id:""})
    }
    const category = categories.filter((cate) => {
      return cate.id === value;
    });
    if (category.length) {
      setAssignees([...category[0].users]);
    }
  };

  const isUpdate = () => {
    for(let i in request){
      if(request[i]!== requestForm[i]) return true;
    }
    return false;
  };
  const onSuccess = (message) => {
    toast.success(message, { autoClose: TIME_CLOSE });
    dispatch(loadSuccess());
    onBack();
  };

  const displayValue = (value)=>{
    const is =  assignees.some((assignee)=> assignee.id === value);
    return is ? value : null;
  }
  useEffect(() => {
    loadAssignee(requestForm.category_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestForm.category_id]);
  useEffect(() => {
    if (labelName === "Create Request") {
      setRequestForm({ ...requestForm, user_id: myId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="modal-request">
      <div className="modal-header">
        <label className="name-request">{labelName}</label>
        <div className="btn-group">
          <Button className="btn btn-cancel" onClick={onBack}>
            Back
          </Button>
          <Spin spinning={isPress}>
            {labelName === "Create Request" ? (
              <Button className="btn btn-create" onClick={handleCreate}>
                Create
              </Button>
            ) : (
              isEdit && (
                <Button className="btn btn-update" onClick={handleUpdate}>
                  Update
                </Button>
              )
            )}
          </Spin>
        </div>
      </div>
      <div className="modal-body">
        <div className="name-request">
          <input
            type="text"
            placeholder="Title"
            value={requestForm.title}
            onChange={(e) => handleChangeName(e.target.value)}
            disabled={!isEdit}
          />
        </div>
        <div className="modal-content">
          <div className="content-request">
            <textarea
              placeholder="Add a description..."
              value={requestForm.content}
              onChange={(e) => handleChangeContent(e.target.value)}
              disabled={!isEdit}
            ></textarea>
          </div>
          <div className="select">
            <div className="select-opt">
              <label>Status</label>
              {labelName === "Create Request" || !roleAdmin ? (
                <span className="status status-open">Open</span>
              ) : (
                <SelectStatus
                  className="status select-data"
                  onSelect={handleSelectStatus}
                  defaultValue={requestForm.status_id}
                />
              )}
            </div>
            <div className="select-opt">
              <label>Category</label>
              <Spin spinning={isCategories}>
                <Select
                  className="select-data"
                  defaultValue={requestForm.category_id}
                  onSelect={handleSelectCategory}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  showSearch={true}
                  disabled={!isEdit}
                >
                  {categories.map((category) => {
                    return (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Spin>
            </div>
            <div className="select-opt">
              <label>Assignee</label>
              <Select
                className="select-data"
                onSelect={handleSelectAssignee}
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
                value={displayValue(assignee.id)}
                disabled={!isEdit}
              >
                {assignees.map((assignee) => {
                  return (
                    <Select.Option key={assignee.id} value={assignee.id}>
                      {assignee.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
            <div className="select-opt">
              <label>Priority</label>
              <SelectPriority
                className="priority select-data"
                onSelect={handleSelectPriority}
                defaultValue={
                  labelName === "Create Request" ? 2 : requestForm.priority_id
                }
                disabled={!isEdit}
              />
            </div>
            <div className="select-opt">
              <label>Due date</label>
              <Input
                className="select-data"
                placeholder="Due Date"
                type={"date"}
                value={
                  requestForm.due_date === ""
                    ? ""
                    : convertDateInput(requestForm.due_date)
                }
                onChange={(e) => handleChangeDate(e.target.value)}
                disabled={!isEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FormRequest.defaultProps = {
  request: {
    title: "",
    due_date: "",
    status_id: 1,
    priority_id: 2,
  },
  assignees: [],
  categories: [],
};

export default FormRequest;
