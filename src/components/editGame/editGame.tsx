import React, { useEffect } from "react";
import { Gallery } from "../gallery/gallery";
import { ChangeGallery } from "../changeGallery/changeGallery";
import { Button } from "../ui/button";
import { useForm, type FieldComponent } from "@tanstack/react-form";
import type { IEditGameProps } from "./types/types";
import { AboutGame, TitleAndDescription } from "./components/wrappers";
import { GenreAndTags, MetaDataGame, SetNewPrice } from "./components/blocksForForm";


const dateStringToDate = (dateString : string) => {
  const parts = dateString.split("-"); 
  const day = parseInt(parts[0], 10); 
  const month = parseInt(parts[1], 10) - 1; 
  const year = parseInt(parts[2], 10); 
  return new Date(year, month, day);
};

const EditGame: React.FC<IEditGameProps> = ({ game, allGenres, allTags }) => {
  const form = useForm({
    defaultValues: {
      title: game.title,
      description: game.description || "",
      releaseDate: dateStringToDate( game.releaseDate).toISOString().split("T")[0],
      systemRequirements: game.systemRequirements,
      aboutGame: game.aboutGame || "",
      price: game.price,
      genres: game.genres,
      tags: game.tags,
      discount: game.discount,
      permitAge: game.permitAge,
      coverImageUrl: game.coverImageUrl,
      bannerImageUrl: game.gameMedia?.bannerUrl,
      trailerUrl: game.gameMedia?.trailer,
      screenshotUrl: game.gameMedia?.screenshotUrl,
      trailerScreenshotUrl: game.gameMedia?.trailerScreenshot,
      developer: game.developer.id,
      publisher: game.publisher.id,
    },


    onSubmit: async ({ value }) => {
      let body = value
       fetch(`/api/games/edit/${game.id}.json`, {
         method: "PUT",
         body: JSON.stringify(body),
       }).then((res) => {
         console.log(res);
       })
    },
    
  });

  useEffect(() => {
    console.log(game.releaseDate);
  }, [form.state]);
  const gameMedia = {
    bannerUrl: form.getFieldValue("bannerImageUrl"),
    trailer: form.getFieldValue("trailerUrl"),
    screenshotUrl: form.getFieldValue("screenshotUrl"),
    trailerScreenshot: form.getFieldValue("trailerScreenshotUrl"),
  }

  console.log(gameMedia);
  

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
        <AboutGame text={game.aboutGame} form={form} />
      </div>
      <div className="w-[500px]">
        <TitleAndDescription
          description={game.description}
          title={game.title}
          form={form}
        />
        <div className="flex flex-col space-y-1 mt-1 mb-1 w-100">
          <MetaDataGame
            developer={game.developer.name}
            publisher={game.publisher.name}
            releaseDate={game.releaseDate}
            form={form}
          />
        </div>
        <div className="flex flex-row space-x-2 mb-1 items-center ">
          <GenreAndTags items={game.genres} type="Genres" allGenreOrTags={allGenres} form={form}/>
        </div>
        <div className="flex flex-row space-x-2 mb-1">
          <GenreAndTags items={game.tags} type="Tags" allGenreOrTags={allTags} form={form} />
        </div>
        <div className="">
          <SetNewPrice form={form} />
        </div>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export { EditGame };
