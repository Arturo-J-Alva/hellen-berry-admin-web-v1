import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dress-list");
  }, [navigate])
  
  return <div>Home</div>;
};

export default Home;
