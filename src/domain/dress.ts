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
  id: string;
  color: string;
  image?: string;
}

export interface DressModel {
  model: string;
  type: DressType;
  createdAt: string;
  sizes: DressSize[];
  colors: DressColor[];
  isPopular: boolean;
  hide: boolean;
  price: string;
  modifiedAt: string;
}

export interface DressColorInput extends DressColor {
  file: File;
}

export interface DressInput
  extends Omit<DressModel, "id" | "createdAt" | "modifiedAt" | "colors"> {
  colors: DressColorInput[];
  currentModel?: string;
  currentType?: DressType;
}

export interface DressInputBody extends Omit<DressInput, "colors"> {
  colors: Omit<DressColorInput, "file">[];
}

export interface DressColorData {
  id: string;
  color: string;
  file?: File;
  image?: string;
}

export interface DressesResponse {
  message: string;
  dresses: DressModel[];
}

export interface DressResponse {
  message: string;
  dress: DressModel;
}
