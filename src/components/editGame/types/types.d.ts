
import { GameInfoResponse, AllGenreAndTagsResponse } from "@/types/types";


export interface IEditGameProps {
  game: GameInfoResponse;
  allGenres: AllGenreAndTagsResponse;
  allTags: AllGenreAndTagsResponse;
}
export interface IAboutGameProps {
  text?: string;
  form?: any;
}
export interface ITextareaForEditProps {
  text?: string;
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
  items: GameInfoResponse["genres"];
  type: "Genres" | "Tags";
  allGenreOrTags: AllGenreAndTagsResponse; 

  form?: any;
}

export interface ISetNewPriceProps {
  form?: any;
}
