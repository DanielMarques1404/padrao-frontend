import { Login } from "@/components/auth/Login";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-svh bg-[url(/imagens/paisagem.jpg)] bg-cover bg-center">
      {/* <div className="flex flex-col items-center justify-center w-1/4 h-1/3 bg-third rounded-2xl border-2 border-primary m-auto">
        <span>teste</span>
        <span>teste</span>
      </div> */}
      {/* <SigninForm action={(sucesso: boolean) => {
        if (sucesso) {
          window.location.href = "/";
        }
      }} /> */}
      <Login />
    </div>
  );
};

export default LoginPage;
