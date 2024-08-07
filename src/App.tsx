import { FC } from "react";
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { PageLayout } from "./components";
import { DressAddOrEdit, DressList, Home, Login, Logout, User } from "./pages";
import globalStore from "./redux/store";

// const Home = lazy(() => import("./pages/Home/Home"));
// const Login = lazy(() => import("./pages/Login/Login"));

const App: FC = () => {
  return (
 <div>
   <Provider store={globalStore}>
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
    </Provider>
    {/* <LoadingPage /> */}
 </div>
  );
};

export default App;
