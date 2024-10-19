import { apiLogin } from "./login.instance";

const postAuthentication = async (
    email: string,
    password: string
  ): Promise<void> => {
    const body = { email, password };
    await apiLogin.post("/auth-user", body);
  };

  const postLogout = async (
  ): Promise<void> => {
    await apiLogin.post("/logout");
  };

export const LoginServices = {
    postAuthentication,
    postLogout
  };
  