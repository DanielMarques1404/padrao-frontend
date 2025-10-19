"use client";
import { FichaDoCorretor } from "@/features/fichas/components/Corretor";
import { useCorretores } from "@/hooks/get-elements";

const Corretores = () => {
  const { data, isLoading } = useCorretores();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-3xl">Ficha dos corretores</label>
        {data && (
          <ul className="flex flex-col gap-2">
            {data.map((corretor, idx) => (
              <li className="m-1" key={`ficha-corretor-${idx}`}>
                <FichaDoCorretor corretor={corretor} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Corretores;
