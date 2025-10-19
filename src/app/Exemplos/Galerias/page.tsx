"use client";
import {
  GallerySlideContent,
  PageContentType,
} from "@/features/galerias/components/layout/ImageList";
import { newgalerias } from "@/lib/data";
import { ImageType } from "@/types/galerias";

const Galerias = () => {
  const handleImageClick = (image: ImageType) => {
    console.log("Image clicked:", image);
  };

  const obj: PageContentType = {
    config: {
      imovel: newgalerias,
      size: "small",
      emphasis: "up",
      currentGallery: newgalerias.galleries[1],
    },
  };

  const obj2: PageContentType = {
    config: {
      imovel: newgalerias,
      size: "large",
      emphasis: "none",
      currentGallery: newgalerias.galleries[0],
    },
  };

  return (
    <div className="w-full h-full items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Galerias</h1>
      <div className="flex flex-col w-5/6 mx-auto gap-4 mb-2">
        <h3>Galeria para a ficha do imóvel</h3>
        <GallerySlideContent gallerySlide={obj}>
          <div className="flex flex-col w-full h-full items-center justify-center">
            <GallerySlideContent.GalleryTitle />
            <GallerySlideContent.ImageList />
            <div className="w-16 h-8 rounded-full">
              <GallerySlideContent.Navigation />
            </div>
          </div>
        </GallerySlideContent>

        <h3>Galeria de destaque para a ficha do imóvel</h3>
        <GallerySlideContent gallerySlide={obj}>
          <div className="flex flex-col w-full h-full items-center justify-center">
            <GallerySlideContent.SelectedImage />
            <GallerySlideContent.ImageList />
          </div>
        </GallerySlideContent>

        <h3>Possível mobile</h3>
        <GallerySlideContent gallerySlide={obj2}>
          <div className="flex flex-col w-[396px] h-full items-center justify-center mx-auto">
            <GallerySlideContent.ImageList />
            <div className="w-16 h-8 rounded-full">
              <GallerySlideContent.Navigation amount={392} />
            </div>
          </div>
        </GallerySlideContent>

        <h3>Possível mobile 2</h3>
        <GallerySlideContent gallerySlide={obj2}>
          <div className="relative flex w-[496px] items-center mx-auto">
            <div className="absolute left-6 w-[30px] h-96 bg-primary opacity-20 cursor-pointer z-10 hover:opacity-100">
              <GallerySlideContent.NavigationButton
                amount={392}
                direction={"left"}
                className="w-full h-full bg-secondary opacity-90"
              />
            </div>

            <div className="w-[396px] h-full items-center justify-center mx-auto">
              <GallerySlideContent.ImageList />
            </div>

            <div className="absolute right-6 w-[30px] h-96 bg-primary opacity-20 cursor-pointer z-10 hover:opacity-100">
              <GallerySlideContent.NavigationButton
                amount={392}
                direction={"right"}
                className="w-full h-full bg-secondary opacity-90"
              />
            </div>
          </div>
        </GallerySlideContent>

        <h3>GalleryShow</h3>
        <GallerySlideContent gallerySlide={obj}>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <GallerySlideContent.ImageIndex />
              <GallerySlideContent.ControlPanel color="black" />
            </div>
            <div className="flex items-center justify-evenly gap-1">
              <div>
                <GallerySlideContent.GalleryButtons classname="flex flex-col cursor-pointer gap-2 items-center justify-start overflow-hidden list-none w-60 h-full px-4 select-none" />
              </div>

              <div className="flex flex-col w-full h-full items-center justify-center">
                <GallerySlideContent.ImageTitle />
                <div className="relative flex w-[496px] items-center mx-auto">
                  <div className="absolute left-16 w-8 h-8 rounded-full z-10">
                    <GallerySlideContent.ChangeImageButton
                      direction="left"
                      className="w-full h-full cursor-pointer bg-secondary opacity-40 hover:opacity-90 rounded-full"
                    />
                  </div>

                  <div className="w-[396px] h-full items-center justify-center mx-auto">
                    <GallerySlideContent.SelectedImage />
                  </div>

                  <div className="absolute right-16 w-8 h-8 rounded-full z-10">
                    <GallerySlideContent.ChangeImageButton
                      direction="right"
                      className="w-full h-full cursor-pointer bg-secondary opacity-40 hover:opacity-90 rounded-full"
                    />
                  </div>
                </div>
                <GallerySlideContent.ImageList />
              </div>
            </div>
          </div>
        </GallerySlideContent>

        {/* <span>ZOOM</span>
        <ImageList
          images={galerias[0].imagens}
          size={"small"}
          onclick={handleImageClick}
          emphasis="zoom"
        />
        <ImageList
          images={galerias[0].imagens}
          size={"medium"}
          onclick={handleImageClick}
          emphasis="zoom"
        />
        <ImageList
          images={galerias[0].imagens}
          size={"large"}
          onclick={handleImageClick}
          emphasis="zoom"
        />

        <span>UP</span>
        <ImageList
          images={galerias[0].imagens}
          size={"small"}
          onclick={handleImageClick}
          emphasis="up"
        />
        <ImageList
          images={galerias[0].imagens}
          size={"medium"}
          onclick={handleImageClick}
          emphasis="up"
        />
        <ImageList
          images={galerias[0].imagens}
          size={"large"}
          onclick={handleImageClick}
          emphasis="up"
        />

        <span>BORDER</span>
        <ImageList
          images={galerias[0].imagens}
          size={"small"}
          onclick={handleImageClick}
          emphasis="border"
        />
        <ImageList
          images={galerias[0].imagens}
          size={"medium"}
          onclick={handleImageClick}
          emphasis="border"
        />
        <ImageList
          images={galerias[0].imagens}
          size={"large"}
          onclick={handleImageClick}
          emphasis="border"
        /> */}
      </div>
    </div>
  );
};

export default Galerias;
