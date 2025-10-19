import { Field } from "@/components/layout/forms/Field";
import { Button } from "@/components/ui/Button";
import { useBairros, useTipos } from "@/hooks/get-elements";
import { mutateContatoForm } from "@/lib/api";
import { ContatoFormType, ContatoPersistType } from "@/types/elements";
import { useMutation } from "@tanstack/react-query";
import IMask from "imask";
import { useEffect, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const FormCadastroContato = () => {
  const defaultValues: ContatoFormType = {
    nome: "",
    email: "",
    telefone: "",
    tipo_imovel: "",
    bairro: "",
    comentario: "",
    valor: "",
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContatoFormType>({
    mode: "onSubmit",
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<ContatoFormType> = (data) => {
    const newData: ContatoPersistType = {
      ...data,
      tipo_imovel: data.tipo_imovel ? parseInt(data.tipo_imovel) : 0,
      bairro: data.bairro ? parseInt(data.bairro) : 0,
      valor: data.valor ? parseFloat(data.valor.replace(/[^0-9.-]+/g, "")) : 0,
      telefone: data.telefone.replace(/\D/g, ""),
    };
    mutation.mutate(newData);
  };
  const inputClassName = "w-full text-xl px-4 py-2 border-none";

  const { data: bairros, isLoading: isLoadingBairros } = useBairros();
  const { data: tipos, isLoading: isLoadingTipos } = useTipos();

  const mutation = useMutation<unknown, Error, ContatoPersistType>({
    mutationFn: mutateContatoForm,
    onSuccess: (data) => {
      alert("Formulário enviado com sucesso!");
      reset();
    },
    onError: (error) => {
      alert(error);
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full h-full"
    >
      <Field label="Nome" error={errors.nome?.message}>
        <input
          type="text"
          {...register("nome", { required: "Este campo é obrigatório" })}
          className={inputClassName}
          placeholder="Nome completo"
        />
      </Field>

      <Field label="E-mail" error={errors.email?.message}>
        <input
          type="text"
          {...register("email", {
            required: "Este campo é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Digite um e-mail válido",
            },
          })}
          placeholder="Digite seu e-mail"
          className={inputClassName}
        />
      </Field>

      <Field label="Telefone" error={errors.telefone?.message}>
        <Controller
          name="telefone"
          control={control}
          rules={{ required: "Este campo é obrigatório" }}
          render={({ field }) => {
            const inputRef = useRef(null);

            useEffect(() => {
              if (inputRef.current) {
                const maskOptions = {
                  mask: "(00) 00000-0000",
                };

                const mask = IMask(inputRef.current, maskOptions);
                mask.on("accept", () => {
                  field.onChange(mask.value);
                });

                return () => mask.destroy();
              }
            }, []);

            return (
              <input
                id="phone"
                type="text"
                placeholder="(__) _____-____"
                ref={inputRef}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                className={inputClassName}
              />
            );
          }}
        />
      </Field>

      <Field label="Tipo de Imóvel" error={errors.tipo_imovel?.message}>
        <select
          className={inputClassName}
          {...register("tipo_imovel", {
            required: "Este campo é obrigatório",
          })}
        >
          <option value=""></option>
          {isLoadingTipos ? (
            <option value="">Carregando...</option>
          ) : (
            tipos
              ?.sort((a, b) => a.nome.localeCompare(b.nome))
              .map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))
          )}
        </select>
      </Field>

      <Field label="Bairro" error={errors.bairro?.message}>
        <select
          className={inputClassName}
          {...register("bairro", { required: "Este campo é obrigatório" })}
        >
          <option value=""></option>
          {isLoadingBairros ? (
            <option value="">Carregando...</option>
          ) : (
            bairros
              ?.sort((a, b) => a.nome.localeCompare(b.nome))
              .map((bairro) => (
                <option key={bairro.id} value={bairro.id}>
                  {bairro.nome} - {bairro.cidade.uf.sigla.toLocaleUpperCase()}
                </option>
              ))
          )}
        </select>
      </Field>

      <Field label="Comentário" error={errors.comentario?.message}>
        <textarea
          {...register("comentario", {
            required: "Este campo é obrigatório",
            maxLength: {
              value: 2000,
              message: "Escreva no máximo 2000 caracteres",
            },
            minLength: {
              value: 5,
              message: "Escreva no mínimo 5 caracteres",
            },
          })}
          placeholder="Escreva seu comentário"
          className={`${inputClassName} h-24 border-none focus:outline-none focus:border-none focus:ring-0`}
        />
      </Field>

      <Field label="Valor" error={errors.valor?.message}>
        <Controller
          name="valor"
          control={control}
          rules={{ required: "Este campo é obrigatório" }}
          render={({ field }) => {
            // Função para formatar o valor para exibição
            const formatValue = (value: string) => {
              if (!value) return "";
              let rawNumbers = value.replace(/\D/g, "");
              if (!rawNumbers) return "";
              const numericValue = (parseInt(rawNumbers) / 100).toFixed(2);
              return (
                "R$ " +
                numericValue
                  .replace(".", ",")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              );
            };

            // Função para extrair apenas o valor numérico
            const getNumericValue = (formatted: string) => {
              let rawNumbers = formatted.replace(/\D/g, "");
              if (!rawNumbers) return "";
              return (parseInt(rawNumbers) / 100).toFixed(2);
            };

            return (
              <input
                type="text"
                value={formatValue(field.value)}
                onChange={(e) => {
                  const numeric = getNumericValue(e.target.value);
                  field.onChange(numeric); // Salva apenas o valor numérico no form
                }}
                onBlur={field.onBlur}
                placeholder="R$ 0,00"
                className={inputClassName}
              />
            );
          }}
        />
      </Field>

      <div className="flex gap-2 items-center justify-end p-2">
        <Button onClick={handleSubmit(onSubmit)}>Salvar</Button>
        <Button onClick={() => reset()}>Limpar</Button>
      </div>
    </form>
  );
};
