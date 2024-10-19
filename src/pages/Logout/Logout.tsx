import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedOut } from "../../redux/states/login";

const Logout: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loggedOut());
    localStorage.setItem("isLogged", "false");
  }, [dispatch]);

  return <div>Logout!</div>;
};

export default Logout;
