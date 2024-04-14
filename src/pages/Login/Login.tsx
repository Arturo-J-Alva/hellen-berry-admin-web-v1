import { FC } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-4xl text-center">Login</h1>
      <button
        onClick={() => navigate("/home")}
        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Ir a Home
      </button>
    </div>
  );
};

export default Login;
