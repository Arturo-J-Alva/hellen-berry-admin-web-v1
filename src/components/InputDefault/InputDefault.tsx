import { FC, InputHTMLAttributes } from "react";

interface InputDefaultProps extends InputHTMLAttributes<HTMLDivElement> {
  label: string;
  placeholder: string;
}

const InputDefault: FC<InputDefaultProps> = ({
  label,
  placeholder,
  ...rest
}) => {
  return (
    <div {...rest}>
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default InputDefault;
