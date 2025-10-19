import { useEffect, useRef } from "react";

type HorizontalDragOptions = {
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
};

export function useHorizontalDrag<T extends HTMLElement>(
  options?: HorizontalDragOptions
) {
  const ref = useRef<T>(null);
  const isDragging = useRef(false);
  const wasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && options?.onArrowLeft) {
        options.onArrowLeft();
      } else if (e.key === "ArrowRight" && options?.onArrowRight) {
        options.onArrowRight();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [options?.onArrowLeft, options?.onArrowRight]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    wasDragged.current = false; // reset ao iniciar
    startX.current = e.pageX - (ref.current?.offsetLeft || 0);
    scrollLeft.current = ref.current?.scrollLeft || 0;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !ref.current) return;
    e.preventDefault();
    wasDragged.current = true; // houve movimento!
    const x = e.pageX - ref.current.offsetLeft;
    const walk = x - startX.current;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    wasDragged.current = false; // reset ao iniciar
    startX.current = e.touches[0].pageX - (ref.current?.offsetLeft || 0);
    scrollLeft.current = ref.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !ref.current) return;
    wasDragged.current = true; // houve movimento!
    const x = e.touches[0].pageX - ref.current.offsetLeft;
    const walk = x - startX.current;
    ref.current.scrollLeft = scrollLeft.current - walk;
  };
  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const scroll = (direction: "left" | "right", amount = 100) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return {
    ref,
    isDragging,
    wasDragged, // retorne o novo flag
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    scroll,
  };
}
