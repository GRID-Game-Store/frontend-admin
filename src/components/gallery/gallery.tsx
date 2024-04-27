import React from "react";
import { CarouselGallery } from "../carousel/carousel";

interface IPreviewState {
  previewSrc: string;
  format: "video" | "image";

}

const Gallery: React.FC<any> = ({ gameMedia }) => {
  const [previewSrc, setPreviewSrc] = React.useState<IPreviewState>({
    previewSrc: gameMedia.bannerUrl,
    format: "image",
  });

  return (
    <div className="flex flex-col w-[720px]">
      {previewSrc.format === "image" ? (
        <img
          width={710}
          className="rounded mb-2 cursor-pointer "
          src={`${previewSrc.previewSrc}`}
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
      <CarouselGallery setPreviewSrc={setPreviewSrc} gameMedia={gameMedia} />
    </div>
  );
};

export { Gallery };
