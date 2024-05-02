import { FC, FormEvent, useCallback, useState } from "react";
import {
  ButtonDefault,
  InputDefault,
  SelectorMulti,
  SelectorOne,
} from "../../components";
import {
  DressColorData,
  DressColorInput,
  DressInput,
  DressSize,
  DressType,
} from "../../domain";
import { postDress } from "../../services/postDress";
import DressColorsGroup from "./DressColorsGroup";

const dressList = [
  { value: "GIRLS", label: "Niña" },
  { value: "WOMEN", label: "Mujer" },
];

const sizeList = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
];

const DressAdd: FC = () => {
  const [dressType, setDressType] = useState("");
  const [model, setModel] = useState("");
  const [dressSize, setDressSize] = useState<DressSize[]>([]);
  const [price, setPrice] = useState("");
  const [colorsData, setColorsData] = useState<DressColorData[]>([]);

  const handledSelectorMulti = useCallback((options: DressSize[]) => {
    setDressSize(options);
  }, []);

  const handleSubtmi = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData: DressInput = {
      model,
      type: dressType as DressType,
      sizes: dressSize,
      price,
      isPopular: false,
      colors: colorsData.map(({ color, file }) => ({
        color,
        file,
        hide: false,
      })) as DressColorInput[],
    };
    console.log(formData);
    const res = await postDress(formData);
    console.log("res:", res);
  };

  return (
    <div>
      Agregar modelo de vestido
      <form className=" max-w-150 mx-auto" onSubmit={handleSubtmi}>
        <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <InputDefault
              label="Nombre del modelo"
              placeholder="Escribe el nombre del vestido"
              onChange={(e) => setModel(e.target.value)}
            />

            <SelectorOne
              label="Tipo de cliente / Categoría"
              optionsCombo={dressList}
              value={dressType}
              onChange={(dress) => setDressType(dress)}
            />

            <SelectorMulti
              id="dressSize"
              label="Tallas disponible"
              optionsCombo={sizeList}
              exportOptionsSelected={handledSelectorMulti}
            />

            <InputDefault
              label="Precio"
              placeholder="Escribe el precio del vestido"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <DressColorsGroup exportDataItems={(items) => setColorsData(items)} />
        </div>
        <div className="text-center mt-6">
          <ButtonDefault className="mx-auto" type="submit">
            Agregar
          </ButtonDefault>
        </div>
      </form>
    </div>
  );
};

export default DressAdd;
