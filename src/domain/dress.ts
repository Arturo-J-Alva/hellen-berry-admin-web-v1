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

export interface ColorOption {
  value: DressColor;
  label: string;
  code?: string;
}

export enum DressColor{
  RED = "RED",
  BLUE = "BLUE",
  SKYBLUE = "SKYBLUE",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  BLACK = "BLACK",
  WHITE = "WHITE",
  PINK_LIGHT = "PINK_LIGHT",
  PINK_BUBBLEGUM ='PINK_BUBBLEGUM',
  PINK_PALE = "PINK_PALE",
  NUDE = "NUDE",
  FUCHSIA = "FUCHSIA",
  LILAC = "LILAC",
  GREY = "GREY",
  PURPLE = "PURPLE",
  OTHER = "OTHER",
}

export interface DressImage {
  id: string;
  color: string;
  image?: string;
}

export interface DressModel {
  model: string;
  type: DressType;
  createdAt: string;
  sizes: DressSize[];
  dressImages: DressImage[];
  isPopular: boolean;
  hide: boolean;
  price: string;
  modifiedAt: string;
}

export interface DressImageInput extends DressImage {
  file: File;
}

export interface DressInput
  extends Omit<DressModel, "id" | "createdAt" | "modifiedAt" | "dressImages"> {
  dressImages: DressImageInput[];
  currentModel?: string;
  currentType?: DressType;
}

export interface DressInputBody extends Omit<DressInput, "dressImages"> {
  dressImages: Omit<DressImageInput, "file">[];
}

export interface DressImageData {
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
