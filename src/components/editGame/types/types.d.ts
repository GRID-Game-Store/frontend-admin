
import { GameInfoResponse, AllGenreAndTagsResponse } from "@/types/types";


export interface IEditGameProps {
  game: GameInfoResponse;
  allGenres: AllGenreAndTagsResponse;
  allTags: AllGenreAndTagsResponse;
  allPlatforms: AllGenreAndTagsResponse;
}
export interface IAboutGameProps {
  form?: any;
}
export interface ITextareaForEditProps {
  width?: string;
  role?: string;
  form?: any;
}
export interface IInputForEditProps {
  additionClassName?: string;
  value?: string;
  role?: string;
  form?: any;
}

export interface ITitleAndDescriptionProps {
  title?: string;
  description?: string;
  role?: string;
  form?: any;
}

export interface IMetaDataGameProps {
  publisher: string;
  developer: string;
  releaseDate?: string;
  form?: any;
}

export interface IGenreAndTagsProps {
  type: "Genres" | "Tags" | "Platforms" | "Publisher" | "Developer";
  allGenreOrTags: AllGenreAndTagsResponse; 
  max?: number;
  form?: any;
}

export interface ISetNewPriceProps {
  form?: any;
}
