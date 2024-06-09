import React from "react";
import { CarouselGallery } from "../carousel/carousel";
import notFound from '@/../public/404.png';

interface IPreviewState {
  previewSrc: string;
  format: "video" | "image";

}

const Gallery: React.FC<any> = ({ gameMedia }) => {
  const [previewSrc, setPreviewSrc] = React.useState<IPreviewState>({
    previewSrc: gameMedia.bannerUrl,
    format: "image",
  });
  const anyImage = gameMedia.bannerUrl || gameMedia.trailer || gameMedia.screenshotUrl || gameMedia.trailerScreenshot;
  
  return (
    <div className={`flex flex-col w-[720px]  ${ !anyImage && "justify-center items-center"}`}>
      {previewSrc.format === "image" ? (
        <img
          width={ previewSrc.previewSrc && anyImage ? 710 : 300}
          className="rounded mb-2 cursor-pointer "
          src={`${previewSrc.previewSrc || notFound.src}`}
          alt=""
        />
      ) : (
        <video
          controls
          width={710}
          className="rounded mb-2"
          src={`${previewSrc.previewSrc}`}
        />
      )}
      {anyImage && <CarouselGallery setPreviewSrc={setPreviewSrc} gameMedia={gameMedia} />}
    </div>
  );
};

export { Gallery };
