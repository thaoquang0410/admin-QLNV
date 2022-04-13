import { useSelector } from "react-redux";
import { ADMIN } from "./../config/constants";
import { useRole } from "./useAuthorization";

export const useLoading = (isRequest) => {
  const isCategories =
    useSelector((state) => state.categories.all).length === 0 ? true : false;
  const isUsers =
    useSelector((state) => state.users.admins).length === 0 ? true : false;
  const isDepartments =
    useSelector((state) => state.departments.all).length === 0 ? true : false;
  const isRoles =
    useSelector((state) => state.users.roles).length === 0 ? true : false;
  const isLoading = useSelector((state) => state.common.isLoading);
  const isNotEdit = useRole(ADMIN);
  if (isNotEdit && isRequest !== "request") {
    return {
      isCategories: false,
      isUsers: false,
      isDepartments: false,
      isLoading,
      isRoles: false,
    };
  } else {
    return { isCategories, isUsers, isDepartments, isLoading, isRoles };
  }
};
