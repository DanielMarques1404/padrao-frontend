"use client";
import Link from "next/link";
import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Usuário: ${username}, Senha: ${password}`);
  };

  return (
    <div className="w-[450px] bg-white/20 backdrop-blur-[10px] border-1 p-2 rounded-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <h1 className="text-3xl text-white text-shadow">Acesse o sistema</h1>
        <div className="w-full h-[50px]">
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-full bg-transparent border-1 border-black rounded-xl text-xl px-4 py-2 outline-none"
          />
        </div>
        <div className="w-full h-[50px]">
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full bg-transparent border-1 border-black rounded-xl text-xl px-4 py-2 outline-none"
          />
        </div>
        <div>
          <label htmlFor="lembrar">
            <input type="checkbox" id="lembrar" />
            Lembrar-me
          </label>
          <Link href="/esqueci-senha">Esqueci minha senha</Link>
        </div>
        <button>Entrar</button>
      </form>
    </div>
  );
};
