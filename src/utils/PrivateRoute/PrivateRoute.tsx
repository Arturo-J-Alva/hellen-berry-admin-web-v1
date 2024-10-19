import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { loggedIn } from "../../redux/states/login";
import globalStore, { AppStore } from "../../redux/store";

const isLogged = localStorage.getItem("isLogged") === "true";
if(isLogged){
    globalStore.dispatch(loggedIn());
}

const PrivateRoute: FC = () => {
  const { isLogged } = useSelector((store: AppStore) => store.login);

  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
