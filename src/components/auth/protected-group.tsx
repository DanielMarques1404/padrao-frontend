"use client";
import { axios } from "@/lib/axios";
import { ACCES_TOKEN, REFRESH_TOKEN } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { SigninForm } from "./form-signin";
import { redirect } from "next/navigation";

type ProtectedGroupProps = {
  groups: string[],
} & React.PropsWithChildren;

export const ProtectedGroup = ({ groups, children }: ProtectedGroupProps) => {
  const [isAuthorized, setIsAuthorized] = useState<Boolean | null>(null);
  const [tentativas, setTentativas] = useState(3);
  const [modalLoginOpen, setModalLoginOpen] = useState(true);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await axios.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem(ACCES_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCES_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration && tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized == null) {
    return <div>Carregando...</div>;
  }

  function handleLogin(sucesso: boolean): void | null {
    setIsAuthorized(sucesso);
    if (sucesso) {
      setTentativas(3);
      setModalLoginOpen(false);
    } else {
      if (tentativas > 0) {
        setTentativas((previous) => previous - 1);
      } else {
        setModalLoginOpen(false);
        redirect('/home');
      }
    }
    console.log(tentativas);
  }

  return isAuthorized ? (
    children
  ) : (
    modalLoginOpen && <SigninForm action={handleLogin} />
  );
};
