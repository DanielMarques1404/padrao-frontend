"use client";
import { useHorizontalDrag } from "@/hooks/draglist";
import { ImageType } from "@/types/galerias";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
  IconPlayerStopFilled,
  IconX,
} from "@tabler/icons-react";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ImageListProps = {
  images: ImageType[];
  size: "small" | "medium" | "large";
  emphasis?: "zoom" | "up" | "border" | "none";
  firstImage?: ImageType | null;
  onclick?: (image: ImageType) => void;
};

export type GallerySlideContentType = {
  imageList: ImageListProps;
  title?: string;
};

type GallerySlideContextType = GallerySlideContentType & {
  drag: ReturnType<typeof useHorizontalDrag<HTMLUListElement>>;
  selectedImage: ImageType | null;
  setSelectedImage: (img: ImageType) => void;
  turnOffSlide: () => void;
  playSlide: () => void;
};

const GallerySlideContext = createContext<GallerySlideContextType | undefined>(
  undefined
);

const useGallerySlideContext = () => {
  const context = useContext(GallerySlideContext);
  if (!context) {
    throw new Error(
      "useGallerySlideContext precisa de um GallerySlideContentType para existir"
    );
  }
  return context;
};

type GallerySlideContentProps = PropsWithChildren & {
  gallerySlide: GallerySlideContentType;
};

export const GallerySlideContent = ({
  children,
  gallerySlide,
}: GallerySlideContentProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(
    gallerySlide.imageList.firstImage || gallerySlide.imageList.images[0]
  );
  const drag = useHorizontalDrag<HTMLUListElement>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const turnOffSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const playSlide = () => {
    intervalRef.current = setInterval(() => {
      setSelectedImage((prev) => {
        if (!prev || !gallerySlide.imageList.images) return prev;
        const fotos = gallerySlide.imageList.images;
        const indexAtual = fotos.findIndex((foto) => foto.id === prev.id);
        const proximaFoto = fotos[(indexAtual + 1) % fotos.length];
        return proximaFoto;
      });
    }, 2000);
  };

  return (
    <GallerySlideContext.Provider
      value={{
        ...gallerySlide,
        drag,
        selectedImage,
        setSelectedImage,
        turnOffSlide,
        playSlide,
      }}
    >
      {children}
    </GallerySlideContext.Provider>
  );
};

type SliderProps = PropsWithChildren;

GallerySlideContent.ControlPanel = () => {
  const { turnOffSlide, playSlide } = useGallerySlideContext();
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="flex gap-4 items-center justify-center cursor-pointer">
      {isPlaying ? (
        <IconPlayerStopFilled
          color="black"
          onClick={() => {
            if (isPlaying) {
              setIsPlaying(false);
              turnOffSlide();
            }
          }}
        />
      ) : (
        <IconPlayerPlay
          color="black"
          onClick={() => {
            if (isPlaying) {
              turnOffSlide();
            } else {
              setIsPlaying(true);
              playSlide();
            }
          }}
        />
      )}
      <IconX color="white" onClick={() => console.log()} />
    </div>
  );
};

GallerySlideContent.Title = () => {
  const { title } = useGallerySlideContext();
  return (
    <h2 className="w-full h-full text-center text-xl text-white bg-primary font-semibold rounded-lg">
      {title}
    </h2>
  );
};

GallerySlideContent.SelectedImage = () => {
  const { selectedImage } = useGallerySlideContext();

  if (!selectedImage) return null;

  return (
    <div className="w-full flex justify-center my-4 select-none">
      <img
        src={selectedImage.src}
        alt={selectedImage.alt || "Imagem selecionada"}
        className="w-96 h-auto object-contain border-4 border-primary rounded shadow-lg"
        onClick={() => {
          selectedImage.onclick && selectedImage.onclick();
        }}
      />
    </div>
  );
};

GallerySlideContent.ImageList = () => {
  const { imageList, drag, selectedImage, setSelectedImage } =
    useGallerySlideContext();

  // Referência para cada <li> da lista de imagens
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedImage || !drag.ref?.current || !containerRef.current) return;

    const container = containerRef.current;
    const item = itemRefs.current[selectedImage.id];

    if (item && container) {
      const scrollTo =
        item.offsetLeft -
        container.offsetLeft +
        item.clientWidth / 2 -
        container.clientWidth / 2;

      drag.ref.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [selectedImage?.id]);

  const getEmphasisClass = (selected: boolean) => {
    if (!selected) return "";
    switch (imageList.emphasis) {
      case "zoom":
        return "scale-125 z-10";
      case "up":
        return "-translate-y-3 z-10";
      case "border":
        return "border-4 border-primary z-10";
      default:
        return "";
    }
  };

  return (
    <div ref={containerRef} className={`w-full h-full select-none`}>
      <ul
        className="flex cursor-pointer gap-2 items-end justify-start overflow-hidden list-none w-full h-full px-4 select-none"
        ref={drag.ref}
        onMouseDown={drag.handleMouseDown}
        onTouchStart={drag.handleTouchStart}
        onTouchMove={drag.handleTouchMove}
        onTouchEnd={drag.handleTouchEnd}
        style={{ cursor: drag.isDragging.current ? "grabbing" : "grab" }}
      >
        {imageList.images.map((image, index) => (
          <li
            key={index}
            ref={(el) => {
              if (el) itemRefs.current[image.id] = el;
            }}
            className="flex-shrink-0 select-none"
            onClick={() => {
              if (drag.wasDragged.current) {
                drag.wasDragged.current = false; // reseta para o próximo clique
                return;
              }
              setSelectedImage(image);
              imageList.onclick && imageList.onclick(image);
            }}
          >
            <img
              src={image.src}
              alt={image.alt || "Image"}
              className={`${
                imageList.size === "small"
                  ? "w-24 h-24 my-4"
                  : imageList.size === "medium"
                  ? "w-56 h-56 my-8"
                  : "w-96 h-96 my-10"
              } border-2 object-cover rounded transition-transform duration-200
              ${getEmphasisClass(image.id === selectedImage?.id)}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

GallerySlideContent.Navigation = ({ amount = 100 }: { amount?: number }) => {
  const { drag, turnOffSlide } = useGallerySlideContext();
  return (
    <div className="flex items-center justify-center gap-1 w-full h-full select-none">
      <IconChevronLeft
        className="w-full h-full cursor-pointer bg-third opacity-90 hover:bg-secondary rounded-full"
        width={16}
        color="white"
        onClick={() => {
          turnOffSlide();
          drag.scroll("left", amount);
        }}
      />
      <IconChevronRight
        className="w-full h-full cursor-pointer bg-third opacity-90 hover:bg-secondary rounded-full"
        width={16}
        color="white"
        onClick={() => {
          turnOffSlide();
          drag.scroll("right", amount);
        }}
      />
    </div>
  );
};

GallerySlideContent.NavigationButton = ({
  amount = 100,
  direction,
  className,
}: {
  amount?: number;
  direction: "left" | "right" | null;
  className: string;
}) => {
  const { drag, turnOffSlide } = useGallerySlideContext();
  if (direction === "left")
    return (
      <IconChevronLeft
        className={className}
        width={16}
        color="white"
        onClick={() => {
          turnOffSlide();
          drag.scroll("left", amount);
        }}
      />
    );
  else if (direction === "right")
    return (
      <IconChevronRight
        className={className}
        width={16}
        color="white"
        onClick={() => {
          turnOffSlide();
          drag.scroll("right", amount);
        }}
      />
    );
  else return "";
};

GallerySlideContent.NextImageButton = ({
  className,
}: {
  className: string;
}) => {
  const { selectedImage, setSelectedImage, imageList, turnOffSlide } =
    useGallerySlideContext();

  const nextImage = () => {
    if (!selectedImage || !imageList.images) return;

    const fotos = imageList.images;
    const indexAtual = fotos.findIndex((foto) => foto.id === selectedImage?.id);
    const proximaFoto = fotos[(indexAtual + 1) % fotos.length];
    turnOffSlide();
    setSelectedImage(proximaFoto);
  };

  return (
    <IconChevronRight
      className={className}
      width={16}
      color="white"
      onClick={() => nextImage()}
    />
  );
};

GallerySlideContent.PriorImageButton = ({
  className,
}: {
  className: string;
}) => {
  const { selectedImage, setSelectedImage, imageList, turnOffSlide } =
    useGallerySlideContext();

  const priorImage = () => {
    if (!selectedImage || !imageList.images) return;

    const fotos = imageList.images;
    const indexAtual = fotos.findIndex((foto) => foto.id === selectedImage?.id);
    const fotoAnterior = fotos[(indexAtual - 1 + fotos.length) % fotos.length];
    turnOffSlide();
    setSelectedImage(fotoAnterior);
  };

  return (
    <IconChevronLeft
      className={className}
      width={16}
      color="white"
      onClick={() => priorImage()}
    />
  );
};
