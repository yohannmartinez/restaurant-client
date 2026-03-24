import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/tailwind/utils";

type TextSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type FontWeight = "light" | "regular" | "medium" | "bold";
type TextAlign = "left" | "center" | "right";
type TextTrim = "normal" | "start" | "end" | "both";
type TextWrap = "wrap" | "nowrap" | "pretty" | "balance";

const weightClasses: Record<FontWeight, string> = {
  light: "font-light",
  regular: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
};

const alignClasses: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const trimClasses: Record<TextTrim, string> = {
  normal: "",
  start: "-mt-[0.42em]",
  end: "-mb-[0.36em]",
  both: "-mt-[0.42em] -mb-[0.36em]",
};

const wrapClasses: Record<TextWrap, string> = {
  wrap: "text-wrap",
  nowrap: "text-nowrap",
  pretty: "text-pretty",
  balance: "text-balance",
};

const textSizeClasses: Record<TextSize, string> = {
  "1": "text-xs leading-4",
  "2": "text-sm leading-5",
  "3": "text-base leading-6",
  "4": "text-lg leading-7 tracking-tight",
  "5": "text-xl leading-8 tracking-tight",
  "6": "text-2xl leading-8 tracking-tight",
  "7": "text-3xl leading-10 tracking-tight",
  "8": "text-4xl leading-12 tracking-tight",
  "9": "text-5xl leading-14 tracking-tighter",
};

type SharedTypographyProps = {
  asChild?: boolean;
  weight?: FontWeight;
  align?: TextAlign;
  trim?: TextTrim;
  truncate?: boolean;
  wrap?: TextWrap;
  className?: string;
};

export type TextProps = SharedTypographyProps &
  React.HTMLAttributes<HTMLElement> & {
    as?: "span" | "div" | "label" | "p";
    size?: TextSize;
  };

export function Text({
  as = "span",
  asChild = false,
  size = "3",
  weight,
  align,
  trim = "normal",
  truncate,
  wrap,
  className,
  ...props
}: TextProps) {
  const Comp = asChild ? Slot.Root : as;

  return (
    <Comp
      className={cn(
        "font-sans",
        textSizeClasses[size],
        weight ? weightClasses[weight] : "font-normal",
        align && alignClasses[align],
        trimClasses[trim],
        wrap && wrapClasses[wrap],
        truncate && "truncate",
        className
      )}
      {...props}
    />
  );
}
