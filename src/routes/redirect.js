import * as status from "../config/status";
import { clearToken } from "../helpers/storage";

const redirectError = (code, history) => {
  
  switch (parseInt(code)) {
    case status.NOT_FOUND:
      history.push("/not-found");
      return "Not Found";

    case status.UNAUTHORIZED:
      clearToken();
      history.push("/login");
      return "Unauthorized";

    case status.SERVER_ERROR:
      return "Internal Server Error";

    case status.BAD_REQUEST:
      return "Bad Request";

    default:
      return "Unknown Error";
  }
};

export default redirectError;
