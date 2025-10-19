import { PropsWithChildren } from "react";

type FieldProps = PropsWithChildren & {
  label: string;
  error?: string;
};

export const Field = ({ label, error, children }: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative pt-2 w-full">
        <label
          className={`absolute bg-white top-0 left-4 px-2 text-sm font-semibold ${
            error ? "text-error" : "text-primary"
          } `}
        >
          {label}
        </label>
        <div
          className={`rounded-md border-2 ${
            error ? "border-error" : "border-primary"
          }`}
        >
          {children}
        </div>
      </div>
      {error && <span className="text-sm text-error">{error}</span>}
    </div>
  );
};
