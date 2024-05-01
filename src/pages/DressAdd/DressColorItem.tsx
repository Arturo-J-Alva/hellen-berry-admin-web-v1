import { Dispatch, FC, useEffect, useState } from "react";
import { AddCircleIcon, TrashIcon } from "../../assets/svg";
import { InputDefault, InputFile } from "../../components";
import { DressColorData } from "../../domain";

interface DressColorProps {
  index: number;
  addItem: () => void;
  deleteItem: (index: number) => void;
  lastIndex: number;
  setDataItems: Dispatch<React.SetStateAction<DressColorData[]>>;
  dataWasFilled: boolean;
}

const classesInitial = "opacity-0 -translate-y-10";

const DressColorItem: FC<DressColorProps> = ({
  addItem,
  deleteItem,
  index,
  lastIndex,
  setDataItems,
  dataWasFilled,
}) => {
  const numberItem = index + 1;
  const lastNumberItem = lastIndex + 1;
  const isLastItem = index === lastIndex;

  const [classOpacityAndTranslate, setClassOpacityAndTranslate] =
    useState(classesInitial);

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
        onChange={(e) => {
          setDataItems((prev) => {
            const newDataItems = [...prev];
            newDataItems[index].color = e.target.value;
            return newDataItems;
          });
        }}
      />

      <InputFile
        label={`Imagen ${numberItem}`}
        exportFile={(file) => {
          setDataItems((prev) => {
            const newDataItems = [...prev];
            newDataItems[index].file = file;
            return newDataItems;
          });
        }}
      />
      <div className={`flex justify-center mb-4`}>
        {isLastItem && (
          <button
            className="flex justify-center items-center gap-1.5 mx-auto hover:bg-slate-200 p-2 rounded-md focus:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={addItem}
            type="button"
            disabled={!dataWasFilled}
          >
            <AddCircleIcon height={25} />
            <p>Agregar otro color</p>
          </button>
        )}
        {lastNumberItem > 1 && (
          <button
            className="flex justify-center items-center gap-1.5 mx-auto hover:bg-slate-200 p-2 rounded-md focus:bg-slate-100"
            onClick={handleDeleteItem}
            type="button"
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
