import { baseUrl } from "../config/global";
import { DressInput, DressInputBody, DressModel } from "../domain";

const getExtension = (str: string) => str.slice(str.lastIndexOf("."));

export const postDress = async (
  dressInput: DressInput,
  method: "POST" | "PUT" = "POST"
): Promise<DressModel[] | undefined> => {
  const { colors } = dressInput;

  const formData = new FormData();

  const colorsWithFiles = colors.filter(({ file }) => file);

  colorsWithFiles.forEach(({ file, color }) => {
    formData.append(
      "files",
      file,
      `${dressInput.model}-${color}${getExtension(file.name)}`
    );
  });

  const data: DressInputBody = {
    ...dressInput,
    colors: colors.map(({ color, image }) => ({
      color,
      image,
    })),
  };

  formData.append("data", JSON.stringify(data));

  const res = await fetch(
    `${baseUrl}/dresses`,
    {
      method,
      body: formData,
    }
  );

  const json = (await res.json()) as DressModel[];

  if (res.ok) {
    return json;
  }
};
