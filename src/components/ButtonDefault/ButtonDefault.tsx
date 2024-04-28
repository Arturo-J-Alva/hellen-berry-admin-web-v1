import { FC, HTMLAttributes } from "react";

interface ButtonDefaultProps extends HTMLAttributes<HTMLButtonElement> {}

const ButtonDefault: FC<ButtonDefaultProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-36 inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonDefault;
