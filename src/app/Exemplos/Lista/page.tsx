"use client";
import { SelectGenericItems } from "@/components/layout/forms/SelectGenericItems";
import { ListItem } from "@/components/layout/lists/generics/ListItem";
import { useDiferenciais, useUfs } from "@/hooks/get-elements";
import { GenericList } from "@/types/generics";
import { useEffect, useState } from "react";

const Lista = () => {
  const { data: diferenciaisData, isLoading: diferenciaIsLoading } =
    useDiferenciais();
  const [listaDiferenciais, setListaDiferenciais] = useState<
    GenericList | undefined
  >(undefined);

  const { data: ufsData, isLoading: ufsIsLoading } = useUfs();
  const [listaUfs, setListaUfs] = useState<GenericList | undefined>(undefined);

  useEffect(() => {
    if (diferenciaisData) {
      const items = diferenciaisData.map((d) => ({
        id: d.id,
        name: d.nome,
        checked: false,
      }));
      setListaDiferenciais({ name: "diferenciais", items: items });
    }
  }, [diferenciaisData]);

  useEffect(() => {
    if (ufsData) {
      const items = ufsData.map((d) => ({
        id: d.id,
        name: d.nome,
        checked: false,
      }));
      setListaUfs({ name: "ufs", items: items });
    }
  }, [ufsData]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-3xl">
          Lista dentro de um campo de seleção
        </label>
        <div className="flex gap-2">
          {listaDiferenciais && (
            <SelectGenericItems
              label={"Diferenciais"}
              placeholder={"Selecione os diferenciais"}
              lista={listaDiferenciais}
              onclick={(l) => console.log(l)}
            />
          )}
          {listaUfs && (
            <SelectGenericItems
              label={"UFs"}
              placeholder={"Selecione as UFs"}
              lista={listaUfs}
              onclick={(l) => console.log(l)}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-3xl">Lista Suspensa</label>
        {listaDiferenciais && (
          <ul className="flex flex-col gap-2 w-[200px]">
            {listaDiferenciais.items.map((dif, idx) => (
              <li key={`diferenciais-${idx}`}>
                <ListItem
                  item={{
                    id: dif.id,
                    name: dif.name,
                    checked: false,
                  }}
                  onclick={(item) => console.log("clicando em ", item)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Lista;
