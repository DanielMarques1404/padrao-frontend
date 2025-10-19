import { ImovelType } from "@/types/elements";

type ImovelDoCorretorProps = {
  imovel: ImovelType;
};

export const FichaDoImovel = ({ imovel }: ImovelDoCorretorProps) => {
  return (
    <div className="flex flex-col gap-1 w-[250px] h-[400px] border-2 border-orange-500 overflow-hidden">
      <div className="flex gap-2">
        <label className="font-bold">Empreendimento:</label>
        <label>{imovel.nome}</label>
      </div>
      <div className="flex gap-2">
        <label className="font-bold">Código:</label>
        <label>{imovel.codigo}</label>
      </div>
      <div className="flex gap-2">
        <label className="font-bold">Data da Entrega:</label>
        <label>{imovel.data_entrega}</label>
      </div>
    </div>
  );
};

export const CardDoImovel = ({ imovel }: ImovelDoCorretorProps) => {
  return (
    <div className="flex flex-col w-[250px] h-[350px] border-2 border-orange-500">
        <div className="h-1/3"></div>
        <div className="h-2/3 border-t-2 border-orange-500"></div>
    </div>
  );
};
