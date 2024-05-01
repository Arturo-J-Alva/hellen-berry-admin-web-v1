import { FC, useEffect, useState } from "react";
import { DressColorData } from "../../domain";
import { scrollToBottom } from "../../utils/scrollToBottom";
import DressColorItem from "./DressColorItem";

interface DressColorsGroupProps {
  exportDataItems?: (dataItems: DressColorData[]) => void;
}

const generateUniqueId = () => new Date().getTime().toString();
const initDataItem: DressColorData = { id: generateUniqueId(), color: "" };

const DressColorsGroup: FC<DressColorsGroupProps> = ({ exportDataItems }) => {
  const [dataItems, setDataItems] = useState<DressColorData[]>([initDataItem]);

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

  return (
    <div>
      {dataItems.map(({ id, color, file }, index) => (
        <DressColorItem
          key={id}
          addItem={addItem}
          index={index}
          deleteItem={deleteItem}
          lastIndex={lastIndex}
          setDataItems={setDataItems}
          dataWasFilled={!!color && !!file}
        />
      ))}
    </div>
  );
};

export default DressColorsGroup;
