
export enum AppMode {
  Glasses = 'Glasses',
  Outfit = 'Outfit',
  Furniture = 'Furniture',
  HomeDesign = 'HomeDesign',
}

export interface ImageFile {
  base64: string;
  mimeType: string;
  name: string;
}
