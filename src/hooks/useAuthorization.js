import { useSelector } from "react-redux";

export const useRole = (point) => {
    const role = useSelector((state) => state.common.account.role_id);
    return role === point;
}