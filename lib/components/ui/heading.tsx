import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/tailwind/utils";

type HeadingSize = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
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

const headingSizeClasses: Record<HeadingSize, string> = {
  "1": "text-xs leading-4 tracking-tight",
  "2": "text-sm leading-5 tracking-tight",
  "3": "text-base leading-6 tracking-tight",
  "4": "text-lg leading-7 tracking-[-0.02em] tracking-tight",
  "5": "text-xl leading-8 tracking-[-0.025em] tracking-tight",
  "6": "text-2xl leading-8 tracking-[-0.03em] tracking-tight",
  "7": "text-3xl leading-10 tracking-[-0.035em] tracking-tight",
  "8": "text-4xl leading-11 tracking-[-0.04em] tracking-tight",
  "9": "text-5xl leading-14 tracking-[-0.045em] tracking-tight",
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

export type HeadingProps = SharedTypographyProps &
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size?: HeadingSize;
  };

export function Heading({
  as = "h1",
  asChild = false,
  size = "6",
  weight,
  align,
  trim = "normal",
  truncate,
  wrap,
  className,
  ...props
}: HeadingProps) {
  const Comp = asChild ? Slot.Root : as;

  return (
    <Comp
      className={cn(
        "font-sans",
        headingSizeClasses[size],
        weight ? weightClasses[weight] : "font-medium",
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
