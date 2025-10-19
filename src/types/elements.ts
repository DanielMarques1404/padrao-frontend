export type UfType = {
  id: number;
  sigla: string;
  nome: string;
};

export type CidadeType = {
  id: number;
  nome: string;
  uf: UfType;
};

export type BairroType = {
  id: number;
  nome: string;
  cidade: CidadeType;
};

export type CorretorType = {
  nome: string;
  email: string;
  creci: string;
  descricao: string;
  imagem: string;
  criado_em: Date;
  atualizado_em: Date;
  url: string;
};

export type TipoType = {
  id: number;
  nome: string;
  ativo: boolean;
};

export type FaixaPrecoType = {
  id: number;
  nome: string;
  valor_inicial: number;
  valor_final: number;
  ativo: boolean;
};

export type SituacaoType = {
  id: number;
  nome: string;
  ativo: boolean;
};

export type DiferencialType = {
  id: number;
  nome: string;
  icone: string;
  criado_em: Date;
  atualizado_em: Date;
  ordem: number;
};

export type ImovelType = {
  id: number;
  bairro: BairroType;
  codigo: string;
  nome: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  ponto_referencia: string;
  quartos: string;
  suites: string;
  banheiros: string;
  vagas: string;
  area_inicial: number;
  area_final: number;
  data_entrega: string;
  criado_em: Date;
  atualizado_em: Date;
  ativo: boolean;
  pretensao: number;
  tipo: TipoType;
  situacao: number;
};

export type ContatoType = {
  nome: string;
  email: string;
  telefone: string;
  tipo_imovel: TipoType;
  bairro: BairroType;
  valor: number;
  comentario: string;
  status: boolean;
  criado_em: Date;
};

export type ContatoFormType = {
  nome: string;
  email: string;
  telefone: string;
  tipo_imovel: string;
  bairro: string;
  comentario: string;
  valor: string;
};

export type ContatoPersistType = {
  nome: string;
  email: string;
  telefone: string;
  tipo_imovel: number;
  bairro: number;
  comentario: string;
  valor: number;
};