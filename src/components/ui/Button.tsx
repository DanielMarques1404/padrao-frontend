import { cn } from "@/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

const buttonVariants = cva("flex items-center justify-center cursor-pointer rounded-2xl", {
  variants: {
    variant: {
      primary:
        "border-2 border-black text-white bg-primary hover:bg-secondary",
      secondary:
        "border-2 border-primary text-white bg-secondary hover:bg-third",
      danger: "border-2 border-red-700 text-white bg-red-500 hover:bg-red-600",
    },
    size: {
      sm: "text-sm px-1 py-0",
      md: "text-base px-3 py-1",
      lg: "text-xl px-4 py-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

export const Button = ({
  children,
  className,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
};


