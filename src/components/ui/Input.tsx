"use client";

type inputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  type: string;
  id: string;
  onChange: (newValue: string) => void;
};

export const Input = ({
  label,
  placeholder,
  value,
  id,
  type,
  onChange,
}: inputProps) => {
  return (
    <div>
      <label className="font-bold" htmlFor="campo">
        {label}
      </label>
      <div className="has-[:focus]:border-orange-600 flex items-center h-14 rounded-3xl border-2 border-orange-200">
        <input
          className="flex-1 outline-none bg-transparent h-full px-4"
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
