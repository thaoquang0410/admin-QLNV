import { LoadingOutlined } from "@ant-design/icons";
import { Select, Spin, Timeline } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MANAGER } from "../../config/constants";
import { getComments, postComment } from "../../store/actions/comments";
import { loading, loadSuccess } from "../../store/actions/common";
import { putRequest } from "../../store/actions/requests";
import Button from "./../../components/Add/Button";
import { convertDate } from "./../../helpers/convertDate";
import { useRole } from "./../../hooks/useAuthorization";
import { useCondition } from "./../../hooks/useCondition";
import { useLoading } from "./../../hooks/useLoading";
import Comment from "./Comment";
import { useEdit } from "./../../hooks/useEdit";

const DetailRequest = ({ request, onClose, onEdit }) => {
  const roleManager = useRole(MANAGER);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments) || [];
  const { isLoading } = useLoading();
  const myId = useSelector((state) => state.common.account.id);
  const { onError } = useCondition();
  const [requestForm, setRequestForm] = useState({ ...request });
  const [comment, setComment] = useState({
    request_id: request.id,
    content: "",
  });
  const isEdit = useEdit(request.status_id, request.user_id, myId);
  const status =
    requestForm.status_id === 1
      ? "open"
      : requestForm.status_id === 2
      ? "processing"
      : "closed";
  const priority =
    requestForm.priority_id === 1
      ? "hight"
      : requestForm.priority_id === 2
      ? "normal"
      : "low";

  const handleChange = (value) => setComment({ ...comment, content: value });
  const handleAddComment = () => {
    dispatch(loading());
    dispatch(postComment(comment, onSuccess, onError));
  };
  const handleApprove = (value) => {
    setRequestForm({ ...requestForm, approve: value });
  };
  const onSuccess = () => {
    setComment({ ...comment, content: "" });
    dispatch(loadSuccess());
  };
  const onApproveSuccess = () => {
    if (requestForm.approve === 0) {
      setRequestForm({ ...requestForm, status_id: 3 });
    } else return;
  };
  const onApproveError = () => {
    setRequestForm({ ...requestForm, approve: "" });
  };
  useEffect(() => {
    dispatch(loading());
    dispatch(getComments(requestForm.id, onSuccess, onError));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestForm.approve]);
  useEffect(() => {
    if (requestForm.status_id === 1 && requestForm.approve !==null) {
      dispatch(putRequest(requestForm, onApproveSuccess, onApproveError));
      dispatch(getComments(requestForm.id, onSuccess, onError));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestForm]);
  return (
    <div>
      <Modal
        visible={true}
        footer={null}
        width={1000}
        className="custome-modal-detail"
        centered={true}
        onCancel={onClose}
      >
        <div className="detail">
          <div className="detail-header">
            <h2>{request.title}</h2>
            <div>
              {isEdit && (
                <Button
                  className="btn btn-update"
                  onClick={() => onEdit(requestForm)}
                >
                  Edit
                </Button>
              )}
              {roleManager && (
                <Select
                  style={{ width: 100 }}
                  placeholder="Accept"
                  disabled={requestForm.approve === null ? false : true}
                  defaultValue={requestForm.approve}
                  onChange={handleApprove}
                  value={requestForm.approve}
                >
                  <Select.Option key={1} value={1}>
                    Approve
                  </Select.Option>
                  <Select.Option key={0} value={0}>
                    Reject
                  </Select.Option>
                </Select>
              )}
            </div>
          </div>
          <div className="detail-content">
            <div className="author-request">
              <h3 style={{ margin: 0 }}>{requestForm.user_name}</h3>
              <span style={{ fontSize: "smaller", color: "yellowgreen" }}>
                Created: {convertDate(requestForm.date)}
              </span>
            </div>
            <div>
              <p>{requestForm.content}</p>
            </div>
            <div className="info-request">
              <div className="info-row">
                <label>Category:</label>
                <span>{requestForm.category_id}</span>
              </div>
              <div className="info-row">
                <label>Assignee:</label>
                <span>{requestForm.operator_name}</span>
              </div>
              <div className="info-row">
                <label>Status:</label>
                <span className={`status-${status}`}>
                  {status[0].toUpperCase() + status.slice(1)}
                </span>
              </div>
              <div className="info-row">
                <label>Priority:</label>
                <span className={`priority-${priority}`}>
                  {priority[0].toUpperCase() + priority.slice(1)}
                </span>
              </div>
            </div>
          </div>
          <h3>Comment({comments.length || 0})</h3>
          <div className="detail-comment">
            <Timeline>
              {comments.map((comment) => {
                return (
                  <Timeline.Item key={comment.id}>
                    <Comment comment={comment} />
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </div>
        </div>
        <div className="detail-write-comment">
          <TextArea
            allowClear
            autoSize={{ minRows: 2, maxRows: 2 }}
            placeholder="Comment...."
            onChange={(e) => handleChange(e.target.value)}
            value={comment.new_value}
          />
          <Spin spinning={isLoading} indicator={<LoadingOutlined />}>
            <Button className="btn btn-comment" onClick={handleAddComment}>
              Comment
            </Button>
          </Spin>
        </div>
      </Modal>
    </div>
  );
};

export default memo(DetailRequest);
