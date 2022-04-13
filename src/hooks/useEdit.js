import { ADMIN } from "./../config/constants";
import { useRole } from "./useAuthorization";

export const useEdit = (status, user, my, labelName = "") => {
  const roleAdmin = useRole(ADMIN);
  const isEdit =
    roleAdmin ||
    (status === 1 && user === my) ||
    labelName === "Create Request";
  return isEdit;
};
