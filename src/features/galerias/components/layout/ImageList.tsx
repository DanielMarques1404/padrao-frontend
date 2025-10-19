"use client";
import { useHorizontalDrag } from "@/hooks/draglist";
import { ConfigType, GalleryType, ImageType } from "@/types/galerias";
import {
  IconArrowsMinimize,
  IconChevronLeft,
  IconChevronRight,
  IconLayoutBottombar,
  IconLayoutBottombarCollapse,
  IconMaximize,
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

export type PageContentType = {
  config: ConfigType;
};

type GallerySlideContextType = PageContentType & {
  drag: ReturnType<typeof useHorizontalDrag<HTMLUListElement>>;
  currentGallery: GalleryType;
  setCurrentGallery: (gallery: GalleryType) => void;
  selectedImage: ImageType | null;
  setSelectedImage: (img: ImageType) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  showBottomGallery: boolean;
  setShowBottomGallery: (value: boolean) => void;
  isFullScreenMode: boolean;
  setIsFullScreenMode: (value: boolean) => void;
  turnOffSlide: () => void;
  playSlide: () => void;
  changeImage: (direction: "left" | "right") => void;
};

const GallerySlideContext = createContext<GallerySlideContextType | undefined>(
  undefined
);

const useGallerySlideContext = () => {
  const context = useContext(GallerySlideContext);
  if (!context) {
    throw new Error(
      "useGallerySlideContext precisa de um PageContentType para existir"
    );
  }
  return context;
};

type GallerySlideContentProps = PropsWithChildren & {
  gallerySlide: PageContentType;
};

export const GallerySlideContent = ({
  children,
  gallerySlide,
}: GallerySlideContentProps) => {
  const [selectedImage, setSelectedImage] = useState<ImageType>(
    gallerySlide.config.currentGallery.currentImage ||
      gallerySlide.config.currentGallery.images[0]
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [showBottomGallery, setShowBottomGallery] = useState(true);
  const [currentGallery, setCurrentGallery] = useState(
    gallerySlide.config.currentGallery
  );
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);
  const drag = useHorizontalDrag<HTMLUListElement>({
    onArrowLeft: () => {
      changeImage("left");
    },
    onArrowRight: () => {
      changeImage("right");
    },
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSelectedImage(currentGallery.images[0]);
    turnOffSlide();
  }, [currentGallery]);

  const changeImage = (direction: "left" | "right") => {
    if (!selectedImage || !currentGallery.images) return;

    const fotos = currentGallery.images;
    const indexAtual = fotos.findIndex((foto) => foto.id === selectedImage.id);
    turnOffSlide();
    if (direction === "right")
      setSelectedImage(fotos[(indexAtual + 1) % fotos.length]);
    else
      setSelectedImage(fotos[(indexAtual - 1 + fotos.length) % fotos.length]);
  };

  const turnOffSlide = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const playSlide = () => {
    if (isPlaying) {
      turnOffSlide();
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setSelectedImage((prev) => {
          if (!prev || !currentGallery.images) return prev;
          const fotos = currentGallery.images;
          const indexAtual = fotos.findIndex((foto) => foto.id === prev.id);
          const proximaFoto = fotos[(indexAtual + 1) % fotos.length];
          return proximaFoto;
        });
      }, 2000);
    }
  };

  return (
    <GallerySlideContext.Provider
      value={{
        ...gallerySlide,
        drag,
        currentGallery,
        setCurrentGallery,
        selectedImage,
        setSelectedImage,
        isPlaying,
        setIsPlaying,
        showBottomGallery,
        setShowBottomGallery,
        isFullScreenMode,
        setIsFullScreenMode,
        turnOffSlide,
        playSlide,
        changeImage,
      }}
    >
      {children}
    </GallerySlideContext.Provider>
  );
};

GallerySlideContent.ControlPanel = ({ color }: { color: string }) => {
  const {
    turnOffSlide,
    playSlide,
    isPlaying,
    showBottomGallery,
    setShowBottomGallery,
    isFullScreenMode,
  } = useGallerySlideContext();
  return (
    <div className="flex gap-4 items-center justify-center cursor-pointer">
      {isPlaying ? (
        <IconPlayerStopFilled color={color} onClick={() => turnOffSlide()} />
      ) : (
        <IconPlayerPlay color={color} onClick={() => playSlide()} />
      )}
      {isFullScreenMode ? (
        <IconArrowsMinimize color={color} onClick={() => console.log()} />
      ) : (
        <IconMaximize color={color} onClick={() => console.log()} />
      )}
      {showBottomGallery ? (
        <IconLayoutBottombarCollapse
          color={color}
          onClick={() => setShowBottomGallery(false)}
        />
      ) : (
        <IconLayoutBottombar
          color={color}
          onClick={() => setShowBottomGallery(true)}
        />
      )}
      <IconX color={color} />
    </div>
  );
};

GallerySlideContent.GalleryTitle = () => {
  const { currentGallery } = useGallerySlideContext();
  return (
    <h2 className="w-full h-full text-center text-xl text-white bg-primary font-semibold rounded-lg">
      {currentGallery.name}
    </h2>
  );
};

GallerySlideContent.ImageTitle = () => {
  const { selectedImage } = useGallerySlideContext();
  return (
    <h2 className="w-full h-full text-center text-2xl font-semibold">
      {selectedImage?.caption}
    </h2>
  );
};

GallerySlideContent.SelectedImage = () => {
  const { selectedImage } = useGallerySlideContext();

  const renderContent = () => {
    switch (selectedImage?.type) {
      case "img":
        return (
          <img
            src={selectedImage.src}
            alt={selectedImage.alt || "Imagem selecionada"}
            className="w-96 h-auto object-contain border-4 border-primary rounded shadow-lg"
            onClick={() => {
              selectedImage.onclick && selectedImage.onclick();
            }}
          />
        );
      case "iframe":
        return (
          <iframe
            src={selectedImage.src}
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: "auto" }}
            allow="fullscreen; xr-spatial-tracking; camera; microphone; autoplay"
            frameBorder={0}
          />
        );
      case "youtube":
        if (selectedImage.src) {
          return (
            <div className="w-[700px] h-[350px]">
              {/* {parse(selectedImage.src || "")} */}
            </div>
          );
        }
        return "";
      case "map":
        if (selectedImage.localization) {
          return (
            <div className="flex items-center justify-center w-3/5 h-full">
              {/* <Location data={selectedImage.localization} /> */}
            </div>
          );
        }
        return "";
      default:
        return <div>Tipo não suportado</div>;
    }
  };

  if (!selectedImage) return null;

  return (
    <div className="w-full flex justify-center my-4 select-none">
      {renderContent()}
    </div>
  );
};

GallerySlideContent.ImageList = () => {
  const {
    config,
    drag,
    selectedImage,
    setSelectedImage,
    showBottomGallery,
    currentGallery,
  } = useGallerySlideContext();

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
    switch (config.emphasis) {
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

  if (!showBottomGallery)
    return (
      <div
        className={`${
          config.size === "small"
            ? "w-24 h-24 my-4"
            : config.size === "medium"
            ? "w-56 h-56 my-8"
            : "w-96 h-96 my-10"
        }`}
      ></div>
    );

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
        {currentGallery.images.map((image, index) => (
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
              image.onclick && image.onclick();
            }}
          >
            <img
              src={image.thumbnail}
              alt={image.alt || "Image"}
              className={`${
                config.size === "small"
                  ? "w-24 h-24 my-4"
                  : config.size === "medium"
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

GallerySlideContent.ChangeImageButton = ({
  className,
  direction,
}: {
  className: string;
  direction: "left" | "right";
}) => {
  const { changeImage } = useGallerySlideContext();

  if (direction === "right")
    return (
      <IconChevronRight
        className={className}
        width={16}
        color="white"
        onClick={() => changeImage(direction)}
      />
    );

  if (direction === "left")
    return (
      <IconChevronLeft
        className={className}
        width={16}
        color="white"
        onClick={() => changeImage(direction)}
      />
    );
};

GallerySlideContent.GalleryButtons = ({ classname }: { classname: string }) => {
  const { config, currentGallery, setCurrentGallery } =
    useGallerySlideContext();
  return (
    <div className={`w-full h-full select-none`}>
      <ul className={classname}>
        {config.imovel.galleries.map((gallery) => (
          <button
            key={gallery.name}
            className={`w-56 h-16 border-2 rounded-xl px-4 py-2 flex justify-center items-center cursor-pointer transition duration-300 ease-in-out
                ${
                  gallery === currentGallery
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-orange-100 text-orange-900 border-orange-300 hover:bg-orange-200"
                }`}
            onClick={() => setCurrentGallery(gallery)}
          >
            <span className="text-xl font-roboto cursor-pointer m-0">
              {gallery.name}
            </span>
          </button>
        ))}
      </ul>
    </div>
  );
};

GallerySlideContent.ImageIndex = () => {
  const { selectedImage, currentGallery } = useGallerySlideContext();
  const getImageIndex = (): string => {
    if (!selectedImage) return "";
    const fotos = currentGallery.images;
    if (fotos.length)
      return `${fotos.findIndex((foto) => foto.id === selectedImage.id) + 1}/${
        fotos.length
      }`;
    else return "-/-";
  };

  return <label>{getImageIndex()}</label>;
};
