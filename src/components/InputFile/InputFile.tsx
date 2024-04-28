import { ChangeEvent, FC, HTMLAttributes } from "react";

interface InputFileProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  exportFile?: (file: File) => void;
}

const InputFile: FC<InputFileProps> = ({ label, exportFile, ...props }) => {
  const handlerFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const { validity, files } = event.target;
    const file = files && validity.valid && files[0];
    if (exportFile) {
      exportFile(file as File);
    }
  };

  return (
    <div {...props}>
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <input
        type="file"
        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
        onChange={handlerFile}
      />
    </div>
  );
};

export default InputFile;
