import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => navigate("/home")}>Ir a Home</button>
    </div>
  );
};

export default Login;
