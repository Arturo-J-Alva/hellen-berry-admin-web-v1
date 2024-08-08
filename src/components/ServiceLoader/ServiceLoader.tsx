import { Spinner } from "@nextui-org/react";
import { FC } from "react";

const ServiceLoader: FC = () => {
  return (
    <div className="absolute w-screen h-screen flex justify-center items-center bg-opacity-40 top-0 left-0 z-99999 bg-pink-200">
      <div className="bg-white p-4 rounded-lg">
        <Spinner size="lg" color="primary" />
      </div>
    </div>
  );
};

export default ServiceLoader;
