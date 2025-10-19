import { GenericItem } from "@/types/generics";
import { useEffect, useState } from "react";

type ListItemProps = {
  item: GenericItem;
  onclick: (item: GenericItem) => void;
};

export const ListItem = ({ item, onclick }: ListItemProps) => {
  const [itemLocal, setItemLocal] = useState(item);

  useEffect(() => {
    setItemLocal(item);
  }, [item]);

  const handleClick = () => {
    const newItem = { ...itemLocal, checked: !itemLocal.checked };
    setItemLocal(newItem);
    onclick(newItem);
  };

  return (
    <div
      className="flex gap-2 w-full h-full items-center cursor-pointer hover:bg-secondary hover:text-white px-3 py-2 rounded-2xl"
      onClick={handleClick}
    >
      <div
        className={`w-6 h-3 ${
          itemLocal.checked ? "bg-primary" : "bg-white"
        } border-2 border-black`}
      ></div>
      <label className="cursor-pointer">{itemLocal.name}</label>
    </div>
  );
};
