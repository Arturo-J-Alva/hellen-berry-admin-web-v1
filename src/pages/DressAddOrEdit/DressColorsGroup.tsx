import { FC, useEffect, useState } from "react";
import { DressColor, DressColorData } from "../../domain";
import { generateUniqueId } from "../../utils";
import { scrollToBottom } from "../../utils/scrollToBottom";
import DressColorItem from "./DressColorItem";

interface DressColorsGroupProps {
  exportDataItems?: (dataItems: DressColorData[]) => void;
  resetDataItems?: boolean;
  dataForEdit?: DressColor[];
}

const getInitDataItem = (): DressColorData => {
  return { id: generateUniqueId(), color: "" };
};

const DressColorsGroup: FC<DressColorsGroupProps> = ({
  exportDataItems,
  resetDataItems,
  dataForEdit,
}) => {
  const [dataItems, setDataItems] = useState<DressColorData[]>([
    getInitDataItem(),
  ]);

  useEffect(() => {
    if (dataForEdit) {
      setDataItems(
        dataForEdit.map(({ color, image }, index) => ({
          id: generateUniqueId(index),
          color,
          image,
        }))
      );
    }
  }, [dataForEdit]);

  const addItem = () => {
    setDataItems([...dataItems, { id: generateUniqueId(), color: "" }]);
    scrollToBottom();
  };

  const deleteItem = (index: number) => {
    const newDataItems = dataItems.filter((_, i) => i !== index);
    setDataItems(newDataItems);
  };

  const lastIndex = dataItems.length - 1;

  useEffect(() => {
    if (exportDataItems) {
      exportDataItems(dataItems);
    }
  }, [dataItems, exportDataItems]);

  useEffect(() => {
    if (resetDataItems) {
      setDataItems([getInitDataItem()]);
      const inputsFile =
        document.querySelectorAll<HTMLInputElement>("input[type=file]");
      inputsFile.forEach((input) => {
        input.value = "";
      });
    }
  }, [resetDataItems]);

  return (
    <div>
      {dataItems.map(({ id, color, file, image }, index) => (
        <DressColorItem
          key={id}
          color={color}
          addItem={addItem}
          index={index}
          deleteItem={deleteItem}
          lastIndex={lastIndex}
          setDataItems={setDataItems}
          dataWasFilled={Boolean(color && (file || image))}
          image={image}
        />
      ))}
    </div>
  );
};

export default DressColorsGroup;
