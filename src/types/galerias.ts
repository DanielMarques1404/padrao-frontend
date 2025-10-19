export type LocalizationType = {
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
};

export type ImageType = {
  id: string;
  alt?: string;
  src: string;
  caption: string;
  localization?: LocalizationType;
  thumbnail: string;
  type: "img" | "iframe" | "youtube" | "map";
  onclick?: () => void;
};

////////////

export type GalleryType = {
  name: string;
  images: ImageType[];
  currentImage: ImageType;
};

export type ImovelGalleriesType = {
  id: number;
  galleries: GalleryType[];
};

export type ConfigType = {
  imovel: ImovelGalleriesType;
  size: "small" | "medium" | "large";
  emphasis?: "zoom" | "up" | "border" | "none";
  currentGallery: GalleryType;
};
