"use client";
import { Frame } from "@/components/layout/Frame";
import { FormCadastroContato } from "@/features/contatos/components/FormCadastro";
import { FormFiltroContato } from "@/features/contatos/components/FormFiltro";

const Contato = () => {
  return (
    <div className="flex flex-col gap-2">
      <Frame title="Contato" classname="w-[750px] mx-auto items-center">
        <FormCadastroContato />
      </Frame>
      <Frame
        title="Lista de Contatos"
        classname="mx-auto items-center"
      >
        <FormFiltroContato />
      </Frame>
    </div>
  );
};

export default Contato;
