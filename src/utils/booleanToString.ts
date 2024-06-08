import { Confirmation } from "../domain";

export const booleanToString = (bool: boolean): Confirmation =>
  bool ? Confirmation.Yes : Confirmation.No;
