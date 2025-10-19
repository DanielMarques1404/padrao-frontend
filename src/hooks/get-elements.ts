import { axiosGet } from "@/lib/axios";
import {
  BairroType,
  ContatoType,
  CorretorType,
  DiferencialType,
  ImovelType,
  TipoType,
  UfType,
} from "@/types/elements";
import { ContatoFiltroType } from "@/types/filters";
import { useQuery } from "@tanstack/react-query";

export const useCorretores = () => {
  return useQuery({
    queryKey: ["corretores"],
    queryFn: () => axiosGet<CorretorType[]>("/corretores"),
  });
};

export const useTipos = () => {
  return useQuery({
    queryKey: ["tipos"],
    queryFn: () => axiosGet<TipoType[]>("/tipos"),
  });
};

export const useDiferenciais = () => {
  return useQuery({
    queryKey: ["diferenciais"],
    queryFn: () => axiosGet<DiferencialType[]>("/diferenciais"),
  });
};

export const useUfs = () => {
  return useQuery({
    queryKey: ["ufs"],
    queryFn: () => axiosGet<UfType[]>("/ufs"),
  });
};

export const useImoveis = () => {
  return useQuery({
    queryKey: ["imoveis"],
    queryFn: () => axiosGet<ImovelType[]>("/imoveis/"),
  });
};

export const useBairros = () => {
  return useQuery({
    queryKey: ["bairros"],
    queryFn: () => axiosGet<BairroType[]>("/bairros"),
  });
};

export const useContatos = (
  filters: ContatoFiltroType | null,
  ordering = ""
) => {
  let formattedFilter = "";
  if (filters) {
    formattedFilter = "?";
    if (filters.status === "1")
      formattedFilter += `status=True&`;
    else if (filters.status === "0")
      formattedFilter += `status=False&`;
    if (filters.criadoEmDe)
      formattedFilter += `criado_em_de=${filters.criadoEmDe}&`;
    if (filters.criadoEmAte)
      formattedFilter += `criado_em_ate=${filters.criadoEmAte}`;
  }

  return useQuery({
    queryKey: ["contatos"],
    queryFn: () => axiosGet<ContatoType[]>(`/contatos/${formattedFilter}`),
  });
};

//UFs

// export const getUfs = (): Promise<UfType[]> => {
//   return getUfsApi();
// };

// export const getUfsQueryOptions = () => {
//   return queryOptions({
//     queryKey: ["Ufs"],
//     queryFn: getUfs,
//   });
// };

// type UseUfsOptions = {
//   queryConfig?: QueryConfig<typeof getUfsQueryOptions>;
// };

// export const useUfs = ({ queryConfig }: UseUfsOptions = {}) => {
//   return useQuery({
//     ...getUfsQueryOptions(),
//     ...queryConfig,
//   });
// };

// // Cidades

// export const getCidades = (): Promise<CidadeType[]> => {
//   return getCidadesApi();
// };

// export const getCidadesQueryOptions = () => {
//   return queryOptions({
//     queryKey: ["Cidades"],
//     queryFn: getCidades,
//   });
// };

// type UseCidadesOptions = {
//   queryConfig?: QueryConfig<typeof getCidadesQueryOptions>;
// };

// export const useCidades = ({ queryConfig }: UseCidadesOptions = {}) => {
//   return useQuery({
//     ...getCidadesQueryOptions(),
//     ...queryConfig,
//   });
// };

// // Bairros

// export const getBairros = (): Promise<BairroType[]> => {
//   return getBairrosApi();
// };

// export const getBairrosQueryOptions = () => {
//   return queryOptions({
//     queryKey: ["Bairros"],
//     queryFn: getBairros,
//   });
// };

// type UseBairrosOptions = {
//   queryConfig?: QueryConfig<typeof getBairrosQueryOptions>;
// };

// export const useBairros = ({ queryConfig }: UseBairrosOptions = {}) => {
//   return useQuery({
//     ...getBairrosQueryOptions(),
//     ...queryConfig,
//   });
// };

// // Corretores

// export const getCorretores = (): Promise<CorretorType[]> => {
//   return getCorretoresApi();
// };

// export const getCorretoresQueryOptions = () => {
//   return queryOptions({
//     queryKey: ["Corretores"],
//     queryFn: getCorretores,
//   });
// };

// type UseCorretoresOptions = {
//   queryConfig?: QueryConfig<typeof getCorretoresQueryOptions>;
// };

// export const useCorretores = ({ queryConfig }: UseCorretoresOptions = {}) => {
//   return useQuery({
//     ...getCorretoresQueryOptions(),
//     ...queryConfig,
//   });
// };
