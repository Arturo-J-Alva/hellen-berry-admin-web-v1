import { Confirmation } from "../domain";

export const stringToBoolean = (value: Confirmation): boolean => value === Confirmation.Yes;