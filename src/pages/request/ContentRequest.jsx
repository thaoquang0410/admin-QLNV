import { memo } from "react";
import "../../asset/css/Request.css";
import Button from "../../components/Add/Button";
import { useLoading } from "./../../hooks/useLoading";
import DropdownFilter from "./DropDownFilter";
import ListRequest from "./ListRequest";

export const ContentRequest = ({
  editRequest,
  deleteReq,
  createRequest,
  filter,
  myRequest,
  isMy,
  users,
  categories,
  departments,
  onFilter,
  onClickFilter,
  requests,
}) => {
  const { isLoading } = useLoading("request");

  return (
    <>
      <div className="list">
        <div className="action-request">
          <div className="btn-group">
            <Button className="btn-create" onClick={createRequest}>
              Create
            </Button>
          </div>
          <div className="my-request">
            <Button
              className={isMy ? "btn-my" : "btn"}
              onClick={() => myRequest(isMy)}
            >
              My request
            </Button>
          </div>
        </div>
        <div className="filter">
          <DropdownFilter
            users={users}
            categories={categories}
            departments={departments}
            onFilter={onFilter}
            onClickFilter={onClickFilter}
            filters={filter}
          ></DropdownFilter>
        </div>
        <ListRequest
          dataSource={requests}
          isLoading={isLoading}
          onEdit={editRequest}
          onDelete={deleteReq}
        />
      </div>
    </>
  );
};
export default memo(ContentRequest);
