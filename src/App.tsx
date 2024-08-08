import { FC } from "react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import globalStore from "./redux/store";
import RouterMain from "./RouterMain";

// const Home = lazy(() => import("./pages/Home/Home"));
// const Login = lazy(() => import("./pages/Login/Login"));

const App: FC = () => {
  return (
    <div>
      <Provider store={globalStore}>
        <RouterMain />
      </Provider>
    </div>
  );
};

export default App;
