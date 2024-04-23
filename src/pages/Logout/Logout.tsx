import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate])
  
  return <div>Logout!</div>;
};

export default Logout;
