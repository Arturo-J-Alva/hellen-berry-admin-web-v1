import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedOut } from "../../redux/states/login";
import { LoginServices } from "../../services";

const Logout: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const logout = async () => {
      await LoginServices.postLogout();
      dispatch(loggedOut());
      localStorage.setItem("isLogged", "false");
    };
   
    logout();
    // eslint-disable-next-line
  }, []);

  return <div>Logout!</div>;
};

export default Logout;
