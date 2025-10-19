"use client";
import {
  CardDoImovel,
  FichaDoImovel,
} from "@/features/fichas/components/Imovel";
import { useImoveis } from "@/hooks/get-elements";

const Imoveis = () => {
  const { data: ImoveisData, isLoading: ImoveisIsLoading } = useImoveis();
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-3xl">Informações sobre os imóveis</label>
      {ImoveisData && (
        <div className="flex gap-2">
          <FichaDoImovel imovel={ImoveisData[0]} />
          <CardDoImovel imovel={ImoveisData[0]} />
        </div>
      )}
    </div>
  );
};

export default Imoveis;
