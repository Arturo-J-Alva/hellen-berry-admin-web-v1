import { FC, SVGAttributes } from "react";

export const AddCircleIcon: FC<SVGAttributes<SVGElement>> = (props) => {
  return (
    <svg
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};
