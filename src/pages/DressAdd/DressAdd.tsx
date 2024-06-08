import { Radio, RadioGroup } from "@nextui-org/react";
import { FC, FormEvent, useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  ButtonDefault,
  InputDefault,
  SelectorMulti,
  SelectorOne,
} from "../../components";
import {
  Confirmation,
  DressColorData,
  DressColorInput,
  DressInput,
  DressSize,
  DressType,
} from "../../domain";
import { postDress } from "../../services/postDress";
import { stringToBoolean } from "../../utils";
import { booleanToString } from "../../utils/booleanToString";
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

const notify = () => toast("Modelo registrado!", { position: "bottom-center" });

const DressAdd: FC = () => {
  const [dressType, setDressType] = useState("");
  const [model, setModel] = useState("");
  const [dressSize, setDressSize] = useState<DressSize[]>([]);
  const [price, setPrice] = useState("");
  const [colorsData, setColorsData] = useState<DressColorData[]>([]);
  const [resetColorsData, setResetColorsData] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [hide, setHide] = useState(false);
  const [resetDressSize, setResetDressSize] = useState(false);

  const goResetDressSize = () => {
    setDressSize([]);
    setResetDressSize(true);
    setTimeout(() => {
      setResetDressSize(false);
    }, 10);
  };

  const goResetColorsData = () => {
    setColorsData([]);
    setResetColorsData(true);
    setTimeout(() => {
      setResetColorsData(false);
    }, 10);
  };

  const clearForm = () => {
    setDressType("");
    setModel("");
    goResetDressSize();
    setPrice("");
    goResetColorsData();
    setIsPopular(false);
    setHide(false);
  };

  const isEnabled = Boolean(
    dressType &&
      model &&
      dressSize.length &&
      price &&
      colorsData.map(({ color, file }) => color && file).every(Boolean)
  );

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
      isPopular: isPopular,
      hide,
      colors: colorsData.map(({ color, file }) => ({
        color,
        file,
      })) as DressColorInput[],
    };
    const res = await postDress(formData);
    console.log("res:", res);
    clearForm();
    notify();
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
              value={model}
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
              clearData={resetDressSize}
            />

            <InputDefault
              label="Precio"
              placeholder="Escribe el precio del vestido"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />

            <div>
              <p className="mb-3 block text-black dark:text-white" id="">
                Es popular
              </p>
              <RadioGroup
                orientation="horizontal"
                onChange={(e) =>
                  setIsPopular(stringToBoolean(e.target.value as Confirmation))
                }
                defaultValue={Confirmation.No}
                value={booleanToString(isPopular)}
              >
                <Radio value={Confirmation.Yes} className="mr-2">
                  Sí
                </Radio>
                <Radio value={Confirmation.No}>No</Radio>
              </RadioGroup>
            </div>

            <div>
              <p className="mb-3 block text-black dark:text-white" id="">
                Ocultar
              </p>
              <RadioGroup
                orientation="horizontal"
                onChange={(e) =>
                  setHide(stringToBoolean(e.target.value as Confirmation))
                }
                defaultValue={Confirmation.No}
                value={booleanToString(hide)}
              >
                <Radio value={Confirmation.Yes} className="mr-2">
                  Sí
                </Radio>
                <Radio value={Confirmation.No}>No</Radio>
              </RadioGroup>
            </div>
          </div>
          <DressColorsGroup
            exportDataItems={(items) => setColorsData(items)}
            resetDataItems={resetColorsData}
          />
        </div>
        <div className="text-center mt-6">
          <ButtonDefault
            className="mx-auto"
            type="submit"
            disabled={!isEnabled}
          >
            Agregar
          </ButtonDefault>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DressAdd;
