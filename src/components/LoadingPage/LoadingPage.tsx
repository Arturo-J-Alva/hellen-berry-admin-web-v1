import { Spinner } from "@nextui-org/react";
import { FC } from "react";

const LoadingPage: FC = () => {
  return (
    <div className=" absolute w-screen h-screen flex justify-center items-center opacity-40 top-0 left-0 z-999 bg-pink-700">
     <div className="bg-white p-4 rounded-lg">
     <Spinner size="lg" color="primary" />
     </div>
    </div>
  );
};

export default LoadingPage;
