import { FC } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PageLayout, ServiceLoader } from "./components";
import { DressAddOrEdit, DressList, Home, Login, Logout, User } from "./pages";
import { AppStore } from "./redux/store";
import PrivateRoute from "./utils/PrivateRoute/PrivateRoute";

const RouterMain: FC = () => {
  const { numberRequest } = useSelector((store: AppStore) => store.api);

  return (
    <>
      {numberRequest > 0 && <ServiceLoader />}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
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
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default RouterMain;
