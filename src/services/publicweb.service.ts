import { publicWebSecret } from "../config/global";
import { apiPublicWeb } from "./publicweb.instance";

const postUpdatePublicWeb = async (): Promise<string> => {

  const res = await apiPublicWeb.post<string>(`/revalidate?secret=${publicWebSecret}`);

  return res.data;
};

export const PublicWebServices = {
    postUpdatePublicWeb,
}