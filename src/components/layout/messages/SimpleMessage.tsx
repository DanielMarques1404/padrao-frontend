type Props = {
  message: string;
};

export const SimpleMessage = ({ message }: Props) => {
  return (
    <div className="flex items-center justify-center w-full text-sm bg-messages p-1">
      {message}
    </div>
  );
};
