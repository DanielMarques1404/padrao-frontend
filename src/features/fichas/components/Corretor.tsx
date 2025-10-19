import { CorretorType } from "@/types/elements";
import Link from "next/link";

type FichaDoCorretorProps = {
  corretor: CorretorType;
};
export const FichaDoCorretor = ({ corretor }: FichaDoCorretorProps) => {
  return (
    <div className="flex gap-2 p-2 rounded-2xl w-[500px] h-[200px] border-2 border-orange-400 items-center justify-between shadow-xl">
      <div className="w-1/3">
        <img
          className="w-full h-full object-contain rounded-full"
          alt="Foto do Corretor"
          src={`/imagens/corretores/${corretor.imagem}`}
        />
      </div>
      <div className="flex flex-col p-2 items-center justify-between text-center border-l-2 border-orange-400 w-2/3 h-full">
        <label className="font-bold">{corretor.nome}</label>
        <div className="flex gap-2">
          <label className="font-bold">CRECI:</label>
          <label>{corretor.creci}</label>
        </div>
        <div className="flex gap-2">
          <label className="font-bold">e-mail:</label>
          <label><Link href={`mailto:${corretor.email}`}>{corretor.email}</Link></label>
        </div>
        <div className="flex gap-2">
          <label className="font-bold">site:</label>
          <label><Link href={corretor.url}>{corretor.url}</Link></label>
        </div>
        <label>{corretor.descricao}</label>
      </div>
    </div>
  );
};
