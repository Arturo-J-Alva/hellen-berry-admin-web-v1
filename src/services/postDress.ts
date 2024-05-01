import { baseUrl } from "../config/global";
import { DressInput, DressInputData } from "../domain";

export interface UploadFileResponse {
  link: string;
}

const getExtension = (str: string) => str.slice(str.lastIndexOf("."));

export const postDress = async (
  dressInput: DressInput
): Promise<UploadFileResponse | undefined> => {
  const { colors } = dressInput;

  const formData = new FormData();

  colors.forEach(({ file, color }) => {
    formData.append(
      "files",
      file,
      `${dressInput.model}-${color}${getExtension(file.name)}`
    );
  });

  const data: DressInputData = {
    ...dressInput,
    colors: colors.map(({ color, isPopular, hide }) => ({
      color,
      isPopular,
      hide,
    })),
  };

  formData.append("data", JSON.stringify(data));

  const res = await fetch(`${baseUrl}/dresses`, {
    method: "POST",
    body: formData,
  });

  const json = (await res.json()) as UploadFileResponse;

  if (res.ok) {
    return json;
  }
};
