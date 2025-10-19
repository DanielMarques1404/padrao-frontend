import { TITULO_SITE } from "@/lib/utils";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import Link from "next/link";
import { List } from "./List";

export const FooterPage = () => {
  const faleConoscoItems = [
    { name: "Contato", url: "/contact" },
    { name: "Quem somos", url: "/about" },
    { name: "Equipe de Consultores", url: "/consultants" },
    { name: "Anuncie seu imóvel", url: "/advertise" },
    { name: "Simule seu financiamento", url: "/finance-simulation" },
    { name: "Quero construir minha casa", url: "/build-house" },
  ];

  const faleComOCorretorItems = [
    {
      name: "(085) 98727-0000",
      url: "tel:+5585987270000",
      Icon: IconBrandWhatsapp,
    },
    {
      name: "(085) 98813-0203",
      url: "tel:+5585988130203",
      Icon: IconBrandWhatsapp,
    },
    {
      name: "(085) 99140-3949",
      url: "tel:+5585991403949",
      Icon: IconBrandWhatsapp,
    },
    {
      name: "(085) 99917-4441",
      url: "tel:+5585999174441",
      Icon: IconBrandWhatsapp,
    },
  ];

  return (
    <footer className="bg-primary text-white p-4">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-4">
          <List title={"Fale Conosco"} items={faleConoscoItems} />
          <List title={"Fale com o Corretor"} items={faleComOCorretorItems} />
        </div>

        <p>
          &copy; {new Date().getFullYear()} {TITULO_SITE}. All rights reserved.
        </p>
        <p>
          <Link
            href="/privacy-policy"
            className="text-gray-400 hover:text-white"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};
