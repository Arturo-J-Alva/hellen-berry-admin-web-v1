import { baseUrl } from "../config/global";

interface DeleteDressArgs {
  type: string;
  model: string;
}

export const deleteDress = async ({
  type,
  model,
}: DeleteDressArgs): Promise<undefined> => {
  await fetch(`${baseUrl}/dresses`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, model }),
  });
  return;
};
