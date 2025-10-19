import { Field } from "@/components/layout/forms/Field";
import { Table } from "@/components/layout/grids/Table";
import { Button } from "@/components/ui/Button";
import { useContatos } from "@/hooks/get-elements";
import { maskTelefone } from "@/lib/utils";
import { ContatoFiltroType } from "@/types/filters";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const FormFiltroContato = () => {
  const inputClassName = "w-full text-xl px-4 py-2 border-none";
  const [filtroContatos, setFiltroContatos] =
    useState<ContatoFiltroType | null>(null);
  const { data, isLoading } = useContatos(filtroContatos);
  const [contatos, setContatos] = useState<any[]>([]);

  useEffect(() => {
    let newData: any[];
    if (data) {
      newData = data.map((contato) => ({
        nome: contato.nome,
        email: contato.email,
        telefone: maskTelefone(contato.telefone),
        bairro: `${contato.bairro.nome}/${contato.bairro.cidade.nome}/${contato.bairro.cidade.uf.sigla}`,
        tipo_imovel: contato.tipo_imovel.nome,
        valor: contato.valor,
        status: contato.status,
        criado_em: contato.criado_em,
      }));
      setContatos(newData);
    }
  }, [data]);

  const defaultValues: ContatoFiltroType = {
    criadoEmDe: "",
    criadoEmAte: "",
    status: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContatoFiltroType>({
    mode: "onSubmit",
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<ContatoFiltroType> = (data) => {
    const formattedData: ContatoFiltroType = {
      status: data.status,
      criadoEmDe: data.criadoEmDe ? `${data.criadoEmDe}T00:00:00` : "",
      criadoEmAte: data.criadoEmAte ? `${data.criadoEmAte}T23:59:59` : "",
    };
    setFiltroContatos(formattedData);
  };

  const handleLimpar = () => {
    reset();
    setContatos([]);
  };

  const queryClient = useQueryClient();
  const invalidarQuery = () =>
    queryClient.invalidateQueries({ queryKey: ["contatos"] });

  useEffect(() => {
    invalidarQuery();
  }, [filtroContatos, queryClient]);

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 p-2 w-full h-full"
      >
        <Field label={"Criado depois de:"}>
          <input
            type="date"
            className={inputClassName}
            {...register("criadoEmDe")}
          />
        </Field>

        <Field label={"Criado antes de:"}>
          <input
            type="date"
            className={inputClassName}
            {...register("criadoEmAte")}
          />
        </Field>

        <Field label={"Status"}>
          <div className="flex items-center justify-center w-56 h-11">
            <select
              className={`${inputClassName} outline-none`}
              {...register("status")}
              defaultValue={""}
            >
              <option value="">Todos</option>
              <option value="1">Respondidos</option>
              <option value="0">Não Respondidos</option>
            </select>
            {/* <input type="checkbox" {...register("status")} /> */}
          </div>
        </Field>

        <div className="flex gap-2 items-center justify-end p-2 w-full">
          <Button onClick={handleSubmit(onSubmit)}>Buscar</Button>
          <Button onClick={handleLimpar}>Limpar</Button>
        </div>
      </form>

      {isLoading ? (
        <span>Carregando...</span>
      ) : (
        <Table
          data={contatos}
          colunas={[
            "nome",
            "email",
            "telefone",
            "tipo_imovel",
            "bairro",
            "status",
          ]}
          labels={["Nome", "Email", "Telefone", "Tipo", "Bairro", "Respondido"]}
        />
      )}
    </div>
  );
};
