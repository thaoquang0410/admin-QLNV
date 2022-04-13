import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { clearToken, getToken } from "./helpers/storage";
import UserActive from "./pages/active/ActiveAccount";
import ForgotPassword from "./pages/forgotPassword";
import GeneralFrame from "./pages/generalFrame/index";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import ResetPassword from "./pages/resetPassword";
import PrivateRoute from "./routes/PrivateRoute";
import RedirectLogin from "./routes/RedirectLogin";
import { getAccount } from "./store/actions/common";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useSelector((state) => state.common.account);
  const onError = () => {
    clearToken();
    history.push("/login");
  };
  useEffect(() => {
    if (Object.keys(account).length === 0 && getToken()) {
      dispatch(getAccount(onError));
    }
  });
  return (
    <Switch>
      <PrivateRoute exact path="/">
        <GeneralFrame />
      </PrivateRoute>
      <RedirectLogin path="/actived/:id/:token">
        <UserActive />
      </RedirectLogin>
      <RedirectLogin path="/forgot-password">
        <ForgotPassword />
      </RedirectLogin>
      <RedirectLogin path="/reset-password">
        <ResetPassword />
      </RedirectLogin>
      <RedirectLogin path="/login">
        <Login />
      </RedirectLogin>
      <PrivateRoute path="/users">
        <GeneralFrame />
      </PrivateRoute>
      <PrivateRoute path="/categories">
        <GeneralFrame />
      </PrivateRoute>
      <PrivateRoute path="/requests">
        <GeneralFrame />
      </PrivateRoute>
      <PrivateRoute path="/departments">
        <GeneralFrame />
      </PrivateRoute>
      <Route exact={true} path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
