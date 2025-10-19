import { PropsWithChildren } from "react";

type FrameProps = {
  title: string;
  classname?: string;
} & PropsWithChildren;

export const Frame = ({ title, children, classname }: FrameProps) => {
  return (
    <div
      className={`flex flex-col gap-2 p-4 border-1 border-third shadow-lg shadow-third rounded-2xl m-2 ${classname}`}
    >
      <h1 className="font-bold text-3xl">{title}</h1>
      {children}
    </div>
  );
};
