import { FC } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoadingPage, PageLayout } from "./components";
import { DressAddOrEdit, DressList, Home, Login, Logout, User } from "./pages";
import { AppStore } from "./redux/store";

const RouterMain: FC = () => {
  const { numberRequest } = useSelector((store: AppStore) => store.api);

  return (
    <>
      {numberRequest > 0 && <LoadingPage />}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <PageLayout>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/dress-list" element={<DressList />} />
                  <Route path="/dress-add" element={<DressAddOrEdit />} />
                  <Route path="/dress-edit" element={<DressAddOrEdit />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </PageLayout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default RouterMain;
