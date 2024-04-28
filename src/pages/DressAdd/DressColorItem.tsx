import { FC, useEffect, useState } from "react";
import { AddCircleIcon, TrashIcon } from "../../assets/svg";
import { InputDefault, InputFile } from "../../components";

interface DressColorProps {
  index: number;
  addItem: () => void;
  deleteItem: (index: number) => void;
  lastIndex: number;
}

const classesInitial = "opacity-0 -translate-y-10";

const DressColorItem: FC<DressColorProps> = ({
  addItem,
  deleteItem,
  index,
  lastIndex,
}) => {
  const numberItem = index + 1;
  const lastNumberItem = lastIndex + 1;
  const isLastItem = index === lastIndex;

  const [classOpacityAndTranslate, setClassOpacityAndTranslate] = useState(classesInitial);

  useEffect(() => {
    setTimeout(() => {
      setClassOpacityAndTranslate("opacity-100 translate-y-0");
    }, 300);
  }, []);

  const handleDeleteItem = () => {
    setClassOpacityAndTranslate("opacity-0 -translate-y-10");
    setTimeout(() => {
      deleteItem(index);
    }, 300);
  };

  return (
    <div
      className={`px-6.5 flex flex-col gap-5.5 transition-all duration-300 ${classOpacityAndTranslate}`}
    >
      <div className=" h-0.5 bg-slate-500" />

      <InputDefault
        label={`Color ${numberItem}`}
        placeholder="Escribe el color del vestido"
      />

      <InputFile label={`Imagen ${numberItem}`} />
      <div className={`flex justify-center mb-4`}>
        {isLastItem && (
          <button
            className="flex justify-center items-center gap-1.5 mx-auto hover:bg-slate-200 p-2 rounded-md focus:bg-slate-100"
            onClick={addItem}
          >
            <AddCircleIcon height={25} />
            <p>Agregar otro color</p>
          </button>
        )}
        {lastNumberItem > 1 && (
          <button
            className="flex justify-center items-center gap-1.5 mx-auto hover:bg-slate-200 p-2 rounded-md focus:bg-slate-100"
            onClick={handleDeleteItem}
          >
            <TrashIcon height={25} />
            <p>Eliminar</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default DressColorItem;
