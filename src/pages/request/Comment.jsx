import { useRef, useEffect } from "react";
import { convertDateComments } from "../../helpers/convertDate";

const Comment = ({ comment }) => {
  const contentRef = useRef();
  useEffect(() => {
    contentRef.current.innerHTML = comment.content;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h3 style={{ margin: 0 }}>{comment.user_name}</h3>
      <span
        style={{
          fontSize: "smaller",
          color: "#787878",
          marginBottom: 10,
          display: "block",
        }}
      >
        {convertDateComments(comment.created_at)}
      </span>
      <p ref={contentRef}></p>
    </div>
  );
};

export default Comment;
