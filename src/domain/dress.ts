export enum DressType {
  GIRLS = "GIRLS",
  WOMEN = "WOMEN",
}

export enum DressSize {
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}

export interface DressColor {
  color: string;
  image: string;
  isPopular?: boolean;
  hide?: boolean;
}

export interface DressModel {
  id: string;
  model: string;
  type: DressType;
  createdAt: string;
  modifiedAt: string;
  sizes: DressSize[];
  colors: DressColor[];
  price?: string;
}

export interface DressColorInput extends Omit<DressColor, "image"> {
  file: File;
}

export interface DressInput
  extends Omit<DressModel, "id" | "createdAt" | "modifiedAt" | "colors"> {
  colors: DressColorInput[];
}

export interface DressInputData extends Omit<DressInput, "colors"> {
  colors: Omit<DressColorInput, "file">[];
}

export interface DressColorData {
  id: string;
  color: string;
  file?: File;
}