import { FC, HTMLAttributes, useState } from "react";
import { scrollToBottom } from "../../utils/scrollToBottom";
import DressColorItem from "./DressColorItem";

interface DataItem {
  id: string;
  color: string;
  file?: File;
}

interface DressColorsGroupProps extends  HTMLAttributes<HTMLDivElement>{}

const generateUniqueId = () => new Date().getTime().toString();
const initDataItem: DataItem = { id: generateUniqueId(), color: "" };

const DressColorsGroup: FC<DressColorsGroupProps> = (props) => {
  const [dataItems, setDataItems] = useState<DataItem[]>([initDataItem]);

  const addItem = () => {
    setDataItems([...dataItems, { id: generateUniqueId(), color: "" }]);
    scrollToBottom();
  };

  const deleteItem = (index: number) => {
    const newDataItems = dataItems.filter((_, i) => i !== index);
    setDataItems(newDataItems);
  };

  const lastIndex = dataItems.length - 1;

  return (
    <div {...props}>
      {dataItems.map(({ id }, index) => (
        <DressColorItem
          key={id}
          addItem={addItem}
          index={index}
          deleteItem={deleteItem}
          lastIndex={lastIndex}
        />
      ))}
    </div>
  );
};

export default DressColorsGroup;
