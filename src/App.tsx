import { FC } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home, Login } from "./pages";

// const Home = lazy(() => import("./pages/Home/Home"));
// const Login = lazy(() => import("./pages/Login/Login"));

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
