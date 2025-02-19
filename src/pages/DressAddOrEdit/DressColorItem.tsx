import { Image } from "@nextui-org/react";
import { Dispatch, FC, useEffect, useState } from "react";
import { AddCircleIcon, TrashIcon } from "../../assets/svg";
import { InputFile, SelectorOne } from "../../components";
import { ColorOption, DressColor, DressImageData } from "../../domain";

interface DressColorProps {
  index: number;
  color: string;
  addItem: () => void;
  deleteItem: (index: number) => void;
  lastIndex: number;
  setDataItems: Dispatch<React.SetStateAction<DressImageData[]>>;
  dataWasFilled: boolean;
  image?: string;
}

const classesInitial = "opacity-0 -translate-y-10";

const colorList: ColorOption[] = [
  { value: DressColor.WHITE, label: "Blanco", code: "#FEFEFA" },
  { value: DressColor.BLACK, label: "Negro", code: "#2e2e2e" },
  { value: DressColor.SKYBLUE, label: "Celeste", code: "#87CEEB" },
  { value: DressColor.FUCHSIA, label: "Fuxia", code: "#F5347F" },
  { value: DressColor.PINK_BUBBLEGUM, label: "Chicle", code: "#FD73A7" },
  { value: DressColor.PINK_PALE, label: "Palo rosa", code: "#F99DBC" },
  { value: DressColor.PINK_LIGHT, label: "Rosa bebé", code: "#FEC2D6" },
  { value: DressColor.NUDE, label: "Nude", code: "#FDD9E5" },
  { value: DressColor.RED, label: "Rojo", code: "#FF0000" },
  { value: DressColor.BLUE, label: "Azul", code: "#0000FF" },
  { value: DressColor.GREEN, label: "Verde", code: "#008000" },
  { value: DressColor.YELLOW, label: "Amarillo", code: "#FFFF00" },
  { value: DressColor.LILAC, label: "Lila", code: "#B57EDC" },
  { value: DressColor.PURPLE, label: "Morado", code: "#A020F0" },
  { value: DressColor.GREY, label: "Gris", code: "#96989A" },
  { value: DressColor.OTHER, label: "Otro", code: "" },
];

const DressColorItem: FC<DressColorProps> = ({
  addItem,
  deleteItem,
  index,
  lastIndex,
  setDataItems,
  dataWasFilled,
  color,
  image,
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

      <h2 className=" text-xl font-bold text-black dark:text-white text-center">
        IMAGEN {numberItem}
      </h2>

      <SelectorOne
        label={`Color ${numberItem}`}
        placeholder="Selecciona un color"
        optionsCombo={colorList}
        value={
          color === ""
            ? color
            : colorList.find((item) => item.value === color)?.value ||
              DressColor.OTHER
        }
        onChange={(optionColor) =>
          setDataItems((prev) => {
            const newDataItems = [...prev];
            newDataItems[index].color = optionColor;
            return newDataItems;
          })
        }
      />

      {image && (
        <>
          <label className="mb-3 block text-black dark:text-white">{`Imagen ${numberItem}`}</label>
          <div className="flex flex-row justify-center">
            <Image isZoomed width={240} alt={color} src={image} />
          </div>
        </>
      )}
      <InputFile
        label={!image ? `Imagen ${numberItem}` : "Cambiar imagen"}
        exportFile={(file) => {
          setDataItems((prev) => {
            const newDataItems = [...prev];
            newDataItems[index].image = "";
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
