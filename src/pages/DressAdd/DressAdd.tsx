import { FC, useState } from "react";
import {
  ButtonDefault,
  InputDefault,
  SelectorMulti,
  SelectorOne,
} from "../../components";
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
  return (
    <div>
      Agregar modelo de vestido
      <div className=" max-w-150 mx-auto">
        <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <InputDefault
              label="Nombre del modelo"
              placeholder="Escribe el nombre del vestido"
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
              exportOptionsSelected={(options) => console.log(options)}
            />

            <InputDefault
              label="Precio"
              placeholder="Escribe el precio del vestido"
            />
          </div>
          <DressColorsGroup />
        </div>
      </div>
      <div className="text-center mt-6">
        <ButtonDefault className="mx-auto">Agregar</ButtonDefault>
      </div>
    </div>
  );
};

export default DressAdd;
