import { FC } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PageLayout } from "./components";
import { DressAdd, DressList, Home, Login, Logout, User } from "./pages";

// const Home = lazy(() => import("./pages/Home/Home"));
// const Login = lazy(() => import("./pages/Login/Login"));

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/*"
          element={
            <PageLayout>
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="dress-list" element={<DressList />} />
                <Route path="dress-add" element={<DressAdd />} />
                <Route path="/user" element={<User />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </PageLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
