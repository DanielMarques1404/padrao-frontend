import { TITULO_SITE } from "@/lib/utils";
import Link from "next/link";

export const HeaderPage = () => {
  return (
    <div className="flex items-center justify-between bg-primary p-4">
      <div className="text-white text-lg font-bold">{TITULO_SITE}</div>
      <nav className="space-x-4">
        <Link href="/login" className="text-white hover:text-gray-400">
          Entrar
        </Link>
        <Link href="/cadastrar" className="text-white hover:text-gray-400">
          Cadastre-se
        </Link>
      </nav>
    </div>
  );
};
