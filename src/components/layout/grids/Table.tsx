import {
  IconCheckbox,
  IconDownload,
  IconEdit,
  IconSquare,
  IconTrash,
} from "@tabler/icons-react";

export type GridProps = {
  data: any[];
  colunas: string[];
  labels: string[];
  useIndiceInterno?: boolean;
  detalhar?: (id: number) => void;
  excluir?: (id: number) => void;
  download?: (id: number) => void;
};

export const Table = ({
  data,
  colunas,
  labels,
  useIndiceInterno,
  detalhar,
  excluir,
  download,
}: GridProps) => {
  if (data.length === 0)
    return (
      <div className="flex items-center justify-center text-primary">
        Nenhum registro encontrado
      </div>
    );
  console.log("Table data", data);
  return (
    <table className="border w-full">
      <thead>
        <tr className="bg-primary text-white">
          {labels.map((label) => (
            <th className="border border-third p-2" key={labels.indexOf(label)}>
              {label}
            </th>
          ))}
          {(detalhar || excluir || download) && (
            <th className="border border-third p-2">Ações</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          let idx = item["id"];
          if (useIndiceInterno) {
            idx = index;
          }

          return (
            <tr className="hover:bg-third" key={index}>
              {colunas.map((coluna) => (
                <td
                  key={item[colunas[0]] + coluna}
                  className="text-center border border-third p-2 text-sm"
                >
                  {typeof item[coluna] === "boolean" ? (
                    item[coluna] ? (
                      <IconCheckbox className="text-green-600 inline" />
                    ) : (
                      <IconSquare className="text-gray-400 inline" />
                    )
                  ) : (
                    item[coluna]
                  )}
                </td>
              ))}
              {(detalhar || excluir || download) && (
                <td className="border border-third p-2">
                  <div className="flex gap-1 justify-center">
                    {excluir && (
                      <IconTrash
                        onClick={() => excluir(idx)}
                        className="hover:text-primary-vermelha cursor-pointer"
                      />
                    )}
                    {detalhar && (
                      <IconEdit
                        onClick={() => detalhar(idx)}
                        className="hover:text-primary-vermelha cursor-pointer"
                      />
                    )}
                    {download && (
                      <IconDownload
                        onClick={() => download(idx)}
                        className="hover:text-primary-vermelha cursor-pointer"
                      />
                    )}
                  </div>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
