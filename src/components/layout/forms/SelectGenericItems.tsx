import { GenericList } from "@/types/generics";
import { IconChecks, IconTrash, IconXboxX } from "@tabler/icons-react";
import { ChangeEvent, useEffect, useState } from "react";
import { List } from "../lists/generics/List";

type SelectGenericItemsProps = {
  label: string;
  placeholder: string;
  lista: GenericList;
  onclick: (lista: GenericList) => void;
};
export const SelectGenericItems = ({
  label,
  placeholder,
  lista,
  onclick,
}: SelectGenericItemsProps) => {
  const [mostrarLista, setMostrarItem] = useState(false);
  const [localList, setLocalList] = useState(lista);
  const [localItems, setLocalItems] = useState(lista.items);

  useEffect(() => {
    setLocalList(lista);
    setLocalItems(lista.items);
  }, [lista]);

  const changeAll = (value: boolean) => {
    const newLocalItems = localItems.map((item) => ({
      ...item,
      checked: value,
    }));
    setLocalItems(newLocalItems);

    const newItems = localList.items.map((item) => {
      const updated = newLocalItems.find((i) => i.id === item.id);
      return updated ? { ...item, ...updated } : item;
    });

    const newLista = { ...localList, items: newItems };
    setLocalList(newLista);

    onclick(newLista);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const newItems = localList.items.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setLocalItems(newItems);
  };

  return (
    <div className="flex flex-col p-2">
      <label htmlFor="input-lista" className="text-sm font-bold">
        {label}
      </label>
      <input
        type="text"
        id="input-lista"
        placeholder={placeholder}
        className="px-4 py-2 mb-2"
        onFocus={() => setMostrarItem(true)}
        onChange={(e) => handleChange(e)}
      />
      {mostrarLista && (
        <div className="flex flex-col gap-2">
          <ul className="flex justify-between m-0 p-0 cursor-pointer items-center gap-1 [&>li]:flex [&>li]:justify-center [&>li]:w-full [&>li]:border-2 [&>li]:border-gray-300 [&>li]:hover:bg-gray-200 [&>li]:p-1">
            <li onClick={() => changeAll(true)}>
              <IconChecks />
            </li>
            <li onClick={() => changeAll(false)}>
              <IconTrash />
            </li>
            <li onClick={() => setMostrarItem(false)}>
              <IconXboxX />
            </li>
          </ul>
          <List
            list={localList}
            visibleItems={localItems}
            onclick={(l) => {
              setLocalList(l);
              onclick(l);
            }}
          />
        </div>
      )}
    </div>
  );
};
