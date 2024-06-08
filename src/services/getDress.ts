import { baseUrl } from "../config/global";
import { DressModel } from "../domain";

export interface UploadFileResponse {
  link: string;
}

export const getDress = async (): Promise<DressModel[] | undefined> => {
  const res = await fetch(`${baseUrl}/dresses`, {
    method: "GET",
  });

  const dresses = (await res.json()).dresses as DressModel[];
  const orderDressesByCreatedAt = dresses.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  if (res.ok) {
    return orderDressesByCreatedAt;
  }
};
