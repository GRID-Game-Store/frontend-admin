import type { IAboutGameProps, ITitleAndDescriptionProps } from "../types/types";
import { InputForEdit, TextareaForEdit } from "./blocksForForm";

export const AboutGame: React.FC<IAboutGameProps> = ({ text, form }) => {
  return (
    <>
      <h2 className="pb-0 tracking-tight text-2xl font-extrabold">
        About Game
      </h2>
      <TextareaForEdit text={text} width="730" form={form} role="aboutGame"  />
    </>
  );
};



export const TitleAndDescription: React.FC<ITitleAndDescriptionProps> = ({
  form,
}) => {
  return (
    <>
      <InputForEdit form={form} role="title" />
      <TextareaForEdit form={form} role="description" />
    </>
  );
};
