import { GenericItem, GenericList } from "@/types/generics";
import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

type ListProps = {
  list: GenericList;
  classname?: string;
  visibleItems?: GenericItem[];
  sort?: boolean;
  onclick: (list: GenericList) => void;
};
export const List = ({
  list,
  classname,
  visibleItems,
  sort = true,
  onclick,
}: ListProps) => {
  const [localList, setLocalList] = useState(list);
  const [localVisibleItems, setLocalVisibleItems] = useState(list.items || []);

  useEffect(() => {
    const newItems = sortItems(list.items);
    setLocalList({ ...list, items: newItems });
  }, [list]);

  useEffect(() => {
    if (visibleItems) setLocalVisibleItems(sortItems(visibleItems));
  }, [visibleItems]);

  const handleClick = (item: GenericItem) => {
    const newItems: GenericItem[] = localList.items.filter(
      (i) => i.id !== item.id
    );
    newItems.push(item);
    const newList = { ...localList, items: sortItems(newItems) };
    setLocalList(newList);
    onclick(newList);
  };

  const sortItems = (list: GenericItem[]) => {
    if (!sort) return list;
    return list.sort((a: GenericItem, b: GenericItem) =>
      a.name.localeCompare(b.name)
    );
  };

  return (
    <div className="w-[300px] min-h-[100px] max-h-[300px] overflow-y-auto bg-white border p-2 rounded-md shadow">
      <ul className={`m-0 p-0 ${classname}`}>
        {visibleItems &&
          visibleItems.map((item) => (
            <li key={`list-${list.name}-${item.id}`}>
              <ListItem item={item} onclick={(i) => handleClick(i)} />
            </li>
          ))}
      </ul>
    </div>
  );
};
