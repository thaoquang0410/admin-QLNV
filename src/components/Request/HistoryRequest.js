import React from "react";
import { Card, Avatar, Pagination } from "antd";
import "../../asset/css/Request.css";
import { UserOutlined } from "@ant-design/icons";
import { convertDateComments } from "../../helpers/convertDate";

export default function HistoryRequest({ page, total, comments, onChange }) {
  return (
    <div className="history_request">
      <h3 style={{ textAlign: "center", padding: "8px 0px" }}>
        History Request
      </h3>
      {(comments || []).map((comment) => {
        return (
          <Card key={comment.id}>
            <div className="history_card">
              <Avatar
                src="https://joeschmoe.io/api/v1/random"
                icon={<UserOutlined />}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="text_avatar">{comment.user_name}</div>
                <span className="history_time">
                  {convertDateComments(comment.created_at)}
                </span>
              </div>
            </div>
            <span className="title" dangerouslySetInnerHTML={{ __html: comment.request_title }}></span>
            <ul
              className="history_content"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            ></ul>
          </Card>
        );
      })}

      <Pagination
        className="history_pagination"
        pageSize={4}
        defaultCurrent={page}
        current={page}
        total={total}
        onChange={onChange}
        hideOnSinglePage
        showSizeChanger={false}
      />
    </div>
  );
}
