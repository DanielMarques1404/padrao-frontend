import { BairroType, CidadeType, ContatoPersistType, ContatoType, CorretorType, TipoType, UfType } from "@/types/elements";
import { axios, axiosPost } from "./axios";

export const getUfsApi = async () => {
  try {
    const resultado = await axios.get<UfType[]>("ufs");
    return resultado?.data.sort((a, b) => a.nome.localeCompare(b.nome));
  } catch (error) {
    console.error("Erro em getUfsApi:", error);
    return [];
  }
};

export const getCidadesApi = async () => {
  try {
    const response = await axios.get<CidadeType[]>("cidades");

    return response?.data.sort((a, b) => a.nome.localeCompare(b.nome));
  } catch (error) {
    console.error("Erro em getCidadesApi:", error);
    return [];
  }
};

export const getBairrosApi = async () => {
  try {
    const response = await axios.get<BairroType[]>("bairros");

    return response?.data.sort((a, b) => a.nome.localeCompare(b.nome));
  } catch (error) {
    console.error("Erro em getBairrosApi:", error);
    return [];
  }
};

export const getCorretoresApi = async () => {
  try {
    const response = await axios
      .get<CorretorType[]>("corretores")  
      .then((response) => response.data
    )
    .catch((error) => {
      console.error(error);
    })
    .finally(function () {
      // sempre será executado
    });;

    return response?.sort((a, b) => a.nome.localeCompare(b.nome)) || [];
  } catch (error) {
    console.error("Erro em getCorretoresApi:", error);
    return [];
  }
};

export const getTiposApi = async () => {
  try {
    const response = await axios
      .get<TipoType[]>("tipos")  
      .then((response) => response.data
    )
    .catch((error) => {
      console.error(error);
    })
    .finally(function () {
      // sempre será executado
    });;

    return response?.sort((a, b) => a.nome.localeCompare(b.nome)) || [];
  } catch (error) {
    console.error("Erro em getCorretoresApi:", error);
    return [];
  }
};

export async function mutateContatoForm(contato: ContatoPersistType) {
  try {
    const response = await axiosPost("contatos/", contato);
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    console.error("Erro ao enviar o formulário:", error);
    throw error; // Relança o erro para ser capturado pelo onError
  }
}