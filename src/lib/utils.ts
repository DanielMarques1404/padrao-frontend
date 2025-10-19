export const ACCES_TOKEN = 'access';
export const REFRESH_TOKEN = 'refresh';
export const FORM_ITEM_STYLE = "border p-4 rounded-md w-full text-black";

export const TITULO_SITE = "[Título do Site]";

// Função para aplicar máscara usando regex
export const maskTelefone = (telefone: string) => {
  // Remove tudo que não for número
  const numeros = telefone.replace(/\D/g, "");
  // Aplica a máscara: +55 (99) 99999-9999 ou (99) 99999-9999
  if (numeros.length === 13) {
    // Com DDI
    return numeros.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
  } else if (numeros.length === 11) {
    // Sem DDI
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (numeros.length === 10) {
    // Sem DDI e sem nono dígito
    return numeros.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return telefone; // Retorna como está se não bater nenhum formato
}