import React, { useEffect } from "react";
import { Gallery } from "../gallery/gallery";
import { ChangeGallery } from "../changeGallery/changeGallery";
import { Button } from "../ui/button";
import { useForm, type FieldComponent } from "@tanstack/react-form";
import type { IEditGameProps } from "./types/types";
import { AboutGame, TitleAndDescription } from "./components/wrappers";
import {
  GenreAndTags,
  MetaDataGame,
  SetNewPrice,
} from "./components/blocksForForm";
import { AddNewTagOrGenre, ChangePermitAge } from "../addNew/addNewTagOrGenre";

const dateStringToDate = (dateString: string) => {
  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(day, month, year);
};


const PAGI_PERMIT_AGE = [{
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
}
]


const calculateDiscountedPrice = (initialPrice: number, discountPercent: number) => {
  const discountAmount = initialPrice * (discountPercent / 100);
  const finalPrice = initialPrice + discountAmount;
  return finalPrice;
};


const EditGame: React.FC<IEditGameProps> = ({ game, allGenres, allTags, allPlatforms }) => {
  const form = useForm({
    defaultValues: {
      title: game.title,
      description: game.description || "",
      releaseDate: game.releaseDate  ,
      systemRequirements: game.systemRequirements,
      aboutGame: game.aboutGame || "",
      price: game.price && calculateDiscountedPrice(game.price, game.discount),
      genres: game.genres,
      tags: game.tags,
      discount: game.discount,
      permitAge: "AGE_" + game.permitAge,
      coverImageUrl: game.coverImageUrl,
      bannerImageUrl: game.gameMedia?.bannerUrl,
      trailerUrl: game.gameMedia?.trailer,
      screenshotUrl: game.gameMedia?.screenshotUrl,
      trailerScreenshotUrl: game.gameMedia?.trailerScreenshot,
      developer: game.developer && game.developer.id,
      publisher: game.publisher && game.publisher.id,
      platforms: game.platforms && game.platforms,
    },

    onSubmit: async ({ value }) => {
      let body = value;
      fetch(`/api/games/edit/${game.id}.json`, {
        method: "PUT",
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.ok) {
          window.location.href = `/game/${game.id}`;
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
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col">
        <Gallery gameMedia={gameMedia} form={form} />
        <ChangeGallery form={form} />
        <AboutGame form={form} />
      </div>
      <div className="w-[500px]">
        <TitleAndDescription
          description={game.description}
          title={game.title}
          form={form}
        />
        <div className="flex flex-col space-y-1 mt-1 mb-1 w-100">
          {game.developer && game.publisher && <MetaDataGame
            developer={game.developer.name}
            publisher={game.publisher.name}
            releaseDate={game.releaseDate}
            form={form}
          />}
        </div>
        <div className="flex flex-row space-x-2 mb-1 items-center ">
          <GenreAndTags
            type="Genres"
            allGenreOrTags={allGenres}
            form={form}
          />
        </div>
        <div className="flex flex-row space-x-2 mb-1">
          <GenreAndTags
            type="Tags"
            allGenreOrTags={allTags}
            form={form}
          />
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
        <form.Field name={"permitAge"} > 
          {(field: any) => (
            <ChangePermitAge allAges={PAGI_PERMIT_AGE} field={field}/>
          )}
        </form.Field>
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export { EditGame };
