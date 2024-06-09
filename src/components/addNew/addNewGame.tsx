import React, { useEffect } from "react";
import { Gallery } from "../gallery/gallery";
import { ChangeGallery } from "../changeGallery/changeGallery";
import { Button } from "../ui/button";
import { useForm, type FieldComponent } from "@tanstack/react-form";
import { AddNewTagOrGenre, ChangePermitAge } from "../addNew/addNewTagOrGenre";
import type { IEditGameProps } from "../editGame/types/types";
import {
  AboutGame,
  DialogSysReq,
  SysReq,
  TitleAndDescription,
} from "../editGame/components/wrappers";
import {
  CalendarGameReleaseDate,
  GenreAndTags,
  MetaDataGame,
  SetNewPrice,
} from "../editGame/components/blocksForForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const PAGI_PERMIT_AGE = [
  {
    id: 0,
    name: "AGE_0",
  },
  {
    id: 12,
    name: "AGE_12",
  },
  {
    id: 16,
    name: "AGE_16",
  },
  {
    id: 18,
    name: "AGE_18",
  },
];

// const calculateDiscountedPrice = (
//   initialPrice: number,
//   discountPercent: number
// ) => {
//   const discountAmount = initialPrice * (discountPercent / 100);
//   console.log(discountAmount);

//   const finalPrice = initialPrice + discountAmount;
//   return finalPrice;
// };

const AddNewGame: React.FC<any> = ({
  allGenres,
  allTags,
  allPlatforms,
  allPublishers,
  allDevelopers,
}) => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      active: true,
      releaseDate: new Date().toISOString().split("T")[0],  
      systemRequirements: "",
      aboutGame: "",
      price: 0,
      genres: [],
      tags: [],
      discount: 0,
      permitAge: 0,
      coverImageUrl: "",
      bannerImageUrl: "",
      trailerUrl: "",
      screenshotUrl: "",
      trailerScreenshotUrl: "",
      developer: [],
      publisher: [],
      platforms: [],
    },

    onSubmit: async ({ value }: { value: any }) => {
      console.log(value);
      const data = {
        ...value,
        publisher: value.publisher[0].id,
        developer: value.developer[0].id,
      };
      console.log(data);

      fetch(`/api/games/create.json`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          window.location.href = `/games`;
        }
      });
    },
  });

  const gameMedia = {
    bannerUrl: form.getFieldValue("bannerImageUrl"),
    trailer: form.getFieldValue("trailerUrl"),
    screenshotUrl: form.getFieldValue("screenshotUrl"),
    trailerScreenshot: form.getFieldValue("trailerScreenshotUrl"),
  };

  return (
    <form
      className="mt-20 ml-3 flex flex-row w-max h-max space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
      }}
    >
      <div className="flex flex-col">
        <Gallery gameMedia={gameMedia} form={form} />
        <ChangeGallery form={form} />
        <AboutGame form={form} />
      </div>
      <div className="w-[500px]">
        <TitleAndDescription form={form} />

        <div className="flex flex-row space-x-2 mb-1 items-center ">
          <GenreAndTags
            type="Developer"
            allGenreOrTags={allDevelopers}
            form={form}
            max={1}
          />
        </div>
        <div className="flex flex-row space-x-2 mb-1 items-center ">
          <GenreAndTags
            type="Publisher"
            allGenreOrTags={allPublishers}
            form={form}
            max={1}
          />
        </div>
        <div className="flex flex-row space-x-2 mb-1 items-center ">
          <GenreAndTags type="Genres" allGenreOrTags={allGenres} form={form} />
        </div>
        <div className="flex flex-row space-x-2 mb-1">
          <GenreAndTags type="Tags" allGenreOrTags={allTags} form={form} />
        </div>

        <div className="flex flex-row space-x-2 mb-1">
          <GenreAndTags
            type="Platforms"
            allGenreOrTags={allPlatforms}
            form={form}
          />
        </div>
        <div className="">
          <SetNewPrice form={form} />
        </div>
        <div className="flex flex-row space-x-2 mb-1 ">
          <p className="text-xl text-muted-primary font-bold">Permit age:</p>
          <form.Field name={"permitAge"}>
            {(field: any) => (
              <ChangePermitAge allAges={PAGI_PERMIT_AGE} field={field} />
            )}
          </form.Field>
        </div>
        <div className="flex flex-col  space-y-2">
          <form.Field name={"systemRequirements"}>
            {(field: any) => <DialogSysReq field={field} />}
          </form.Field>
          <Button onClick={form.handleSubmit}  type="submit">Publish</Button>
        </div>
      </div>
    </form>
  );
};

export { AddNewGame };
