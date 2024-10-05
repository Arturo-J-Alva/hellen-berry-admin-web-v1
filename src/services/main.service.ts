import {
  DressInput,
  DressInputBody,
  DressModel,
  DressResponse,
  DressesResponse,
} from "../domain";
import { apiMain } from "./main.instance";

const getDresses = async (): Promise<DressModel[]> => {
  const res = await apiMain.get<DressesResponse>("/dresses");
  const orderDressesByCreatedAt = res.data.dresses.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return orderDressesByCreatedAt;
};

const getExtension = (str: string) => str.slice(str.lastIndexOf("."));

const logicPostPutDress = (dressInput: DressInput): FormData => {
  const { dressImages } = dressInput;

  const formData = new FormData();

  const dressImagesWithFiles = dressImages.filter(({ file }) => file);

  dressImagesWithFiles.forEach(({ file, color }) => {
    formData.append(
      "files",
      file,
      `${dressInput.model}-${color}${getExtension(file.name)}`
    );
  });

  const data: DressInputBody = {
    ...dressInput,
    dressImages: dressImages.map(({ id,color, image }) => ({
      id,
      color,
      image,
    })),
  };

  formData.append("data", JSON.stringify(data));
  return formData;
};

const postDress = async (dressInput: DressInput): Promise<DressModel> => {
  const formData = logicPostPutDress(dressInput);

  const res = await apiMain.post<DressResponse>("/dresses", formData);

  return res.data.dress;
};

const putDress = async (dressInput: DressInput): Promise<DressModel> => {
  const formData = logicPostPutDress(dressInput);

  const res = await apiMain.put<DressResponse>("/dresses", formData);

  return res.data.dress;
};

const deleteDress = async ({
  type,
  model,
}: {
  type: string;
  model: string;
}): Promise<undefined> => {
  await apiMain.delete(`/dresses`, {
    data: { type, model },
    headers: { "Content-Type": "application/json" },
  });

  return;
};

export const MainServices = {
  getDresses,
  postDress,
  putDress,
  deleteDress,
};
