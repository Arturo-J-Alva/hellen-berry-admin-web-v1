import { apiLogin } from "./login.instance";

const postAuthentication = async (
    email: string,
    password: string
  ): Promise<void> => {
    const body = { email, password };
    await apiLogin.post("/auth-user", body);
  };

export const LoginServices = {
    postAuthentication,
  };
  