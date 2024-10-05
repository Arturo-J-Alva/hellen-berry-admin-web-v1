import { Radio, RadioGroup } from "@nextui-org/react";
import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  ButtonDefault,
  InputDefault,
  SelectorMulti,
  SelectorOne,
} from "../../components";
import {
  Confirmation,
  DressImageData,
  DressImageInput,
  DressInput,
  DressModel,
  DressSize,
  DressType,
} from "../../domain";
import { MainServices } from "../../services";
import { generateUniqueId, stringToBoolean } from "../../utils";
import { booleanToString } from "../../utils/booleanToString";
import DressColorsGroup from "./DressColorsGroup";

const dressList = [
  { value: DressType.GIRLS, label: "Niña" },
  { value: DressType.WOMEN, label: "Mujer" },
];

const sizeList = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
];

const notify = (isAddPage: boolean) =>
  toast(isAddPage ? "Modelo registrado!" : "Modelo Editado!", {
    position: "top-left",
  });

const DressAddOrEdit: FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const dressData = location.state?.dress as DressModel | undefined;
  const isEditPage = pathname === "/dress-edit";
  const isAddPage = pathname === "/dress-add";

  const [dressType, setDressType] = useState("");
  const [model, setModel] = useState("");
  const [sizesSelected, setSizesSelected] = useState<DressSize[]>([]);
  const [price, setPrice] = useState("");
  const [dressImagesData, setDressImagesData] = useState<DressImageData[]>([]);
  const [resetColorsData, setResetColorsData] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [hide, setHide] = useState(false);
  const [resetDressSize, setResetDressSize] = useState(false);

  const goResetDressSize = () => {
    setSizesSelected([]);
    setResetDressSize(true);
    setTimeout(() => {
      setResetDressSize(false);
    }, 10);
  };

  const goResetColorsData = () => {
    setDressImagesData([]);
    setResetColorsData(true);
    setTimeout(() => {
      setResetColorsData(false);
    }, 10);
  };

  const clearForm = useCallback(() => {
    setDressType("");
    setModel("");
    goResetDressSize();
    setPrice("");
    goResetColorsData();
    setIsPopular(false);
    setHide(false);
  }, []);

  const fillInitialForm = useCallback(() => {
    if (dressData) {
      setDressType(dressData.type);
      setModel(dressData.model);
      setSizesSelected(dressData.sizes);
      setPrice(dressData.price);
      setDressImagesData(
        dressData.dressImages.map(({ color, image, id }, index) => ({
          id: id || generateUniqueId(index),
          color,
          image,
        }))
      );
      setIsPopular(dressData.isPopular);
      setHide(dressData.hide);
    }
  }, [dressData]);

  useEffect(() => {
    if (isEditPage) {
      fillInitialForm();
    }
    if (isAddPage) {
      clearForm();
    }
  }, [isEditPage, isAddPage, clearForm, fillInitialForm]);

  const isEnabled = Boolean(
    dressType &&
      model &&
      sizesSelected.length &&
      price &&
      dressImagesData
        .map(({ color, file, image }) => color && ((!file && image) || file))
        .every(Boolean)
  );

  const handledSelectorMulti = useCallback((options: DressSize[]) => {
    setSizesSelected(options);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const formData: DressInput = {
      model,
      currentModel: dressData?.model || undefined,
      currentType: dressData?.type || undefined,
      type: dressType as DressType,
      sizes: sizesSelected,
      price,
      isPopular: isPopular,
      hide,
      dressImages: dressImagesData as DressImageInput[],
    };

    if (isAddPage) {
      await MainServices.postDress(formData);
      clearForm();
    }

    if (isEditPage) {
      await MainServices.putDress(formData);
    }

    notify(isAddPage);
  };

  return (
    <div>
      {dressData ? "Editar" : "Agregar"} modelo de vestido
      <form className=" max-w-150 mx-auto" onSubmit={handleSubmit}>
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
              id={`dressSize-${pathname.slice(1)}`}
              label="Tallas disponible"
              optionsCombo={sizeList.map((size) => ({
                ...size,
                selected: dressData?.sizes.some(
                  (dress) => dress === size.value
                ),
              }))}
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
            exportDataItems={(items) => setDressImagesData(items)}
            resetDataItems={resetColorsData}
            dataForEdit={dressData?.dressImages}
          />
        </div>
        <div className="text-center mt-6">
          <ButtonDefault
            className="mx-auto"
            type="submit"
            disabled={!isEnabled}
          >
            {dressData ? "Editar" : "Agregar"}
          </ButtonDefault>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DressAddOrEdit;
