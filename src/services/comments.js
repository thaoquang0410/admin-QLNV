import { api } from "../helpers/api";

const getComments = (request_id) => {
  const url = `/comments/${request_id}`;
  return api.get(url);
};
const postComment = (data) => {
  return api.post("/comments", data);
};
const getHistory = (page) => {
  return api.get(`/comments/?paginate=4&page=${page}`);
};

export { getComments, postComment, getHistory };

