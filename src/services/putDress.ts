import { DressInput, DressModel } from "../domain";
import { postDress } from "./postDress";

export const putDress = (
  dressInput: DressInput
): Promise<DressModel[] | undefined> => postDress(dressInput, "PUT");
