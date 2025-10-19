"use client";

import { axios } from "@/lib/axios";
import { ACCES_TOKEN, REFRESH_TOKEN } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Input } from "../ui/Input";

type SigninFormType = {
  action: (sucesso: boolean) => void;
};

export const SigninForm = ({ action }: SigninFormType) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tentativa, setTentativa] = useState(0);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("api/token/", { username, password });

      localStorage.setItem(ACCES_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      action(true);
    } catch (error) {
      setMensagem("Login falhou!");
      setTentativa((previous) => previous + 1);
      action(false);
    }
  };

  return (
    <div className="fixed flex top-0 left-0 right-0 bottom-0 bg-black/50 items-center justify-center">
      <div className="flex flex-col gap-4 items-center justify-center border-2 p-4 bg-orange-100 rounded-3xl shadow-md max-w-full w-[300px]">
        <div className="flex flex-row-reverse w-full">
          <IconX className="cursor-pointer m-1" onClick={() => action(false)} />
        </div>
        <form>
          <Input
            type="text"
            id="usuario"
            placeholder="Digite nome usuário"
            value={username}
            onChange={(t) => setUsername(t)}
            label={"Usuário"}
          />
          <Input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(t) => setPassword(t)}
            label={"Senha"}
          />
        </form>
        {/* <Button label="Entrar" onclick={handleSubmit} size={1} /> */}
        <a href="/registrar" className="">
          Não tenho cadastro
        </a>
        {mensagem && (
          <label>
            {mensagem} - ({tentativa})
          </label>
        )}
      </div>
    </div>
  );
};
