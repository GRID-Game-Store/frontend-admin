import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { GameInfoResponse } from "@/types/types";
import { Card, CardContent } from "../ui/card";
interface IPreviewState {
    previewSrc: string;
    format: "video" | "image";
}

interface ICarouselGalleryProps {
  gameMedia: GameInfoResponse["gameMedia"];
  setPreviewSrc: React.Dispatch<React.SetStateAction<IPreviewState>>
}

const CarouselGallery: React.FC<ICarouselGalleryProps> = ({ gameMedia, setPreviewSrc }) => {
    const handleChangePreview = (src?: string, format: "video" | "image" = "image") => {
        src && setPreviewSrc({
            previewSrc: src,
            format: format,
        })
        
    }



  return (
    <div>
      <Carousel >
        <CarouselContent className="w-full  ">
          <CarouselItem onClick={() => handleChangePreview(gameMedia?.bannerUrl)} className="hover:opacity-80 lg:basis-1/4">
            <div className="p-1">
              <Card className="overflow-hidden" >
                <CardContent className="flex p-0 overflow-hidden ">
                  <img width={"400px"} src={gameMedia?.bannerUrl} alt=""  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem onClick={() => handleChangePreview(gameMedia?.trailer, "video")} className=" hover:opacity-80 lg:basis-1/4 ">
            <div className="p-1">
              <Card className="overflow-hidden" >
                <CardContent className="flex  p-0 overflow-hidden ">
                  <img width={"400px"} src={gameMedia?.trailerScreenshot} alt=""  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem onClick={() => handleChangePreview(gameMedia?.screenshotUrl)} className="hover:opacity-80 lg:basis-1/4 ">
            <div className="p-1">
              <Card className="overflow-hidden" >
                <CardContent className="flex  p-0 overflow-hidden ">
                  <img width={"400px"} src={gameMedia?.screenshotUrl} alt=""  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export { CarouselGallery };
