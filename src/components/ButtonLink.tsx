import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "light";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonLinkProps) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "button button--primary inline-flex items-center justify-center gap-[10px] min-h-[50px] [padding:0_20px] rounded-[14px] font-bold text-[.93rem] [border-width:1px] [border-style:solid] border-[transparent] [transition:.2s_ease] bg-brand-mint text-brand-dark [box-shadow:0_10px_30px_rgba(132,192,191,.22)] motion-reduce:[transition:none]!",
    secondary:
      "button button--secondary inline-flex items-center justify-center gap-[10px] min-h-[50px] [padding:0_20px] rounded-[14px] font-bold text-[.93rem] [border-width:1px] [border-style:solid] border-[#b9c4c3] [transition:.2s_ease] bg-white text-brand-dark motion-reduce:[transition:none]!",
    ghost:
      "button button--ghost inline-flex items-center justify-center gap-[10px] min-h-[50px] [padding:0_20px] rounded-[14px] font-bold text-[.93rem] [border-width:1px] [border-style:solid] border-[rgba(47,52,54,.25)] [transition:.2s_ease] text-brand-dark [background:transparent] motion-reduce:[transition:none]!",
    light:
      "button button--light inline-flex items-center justify-center gap-[10px] min-h-[50px] [padding:0_20px] rounded-[14px] font-bold text-[.93rem] [border-width:1px] [border-style:solid] border-[rgba(255,255,255,.2)] [transition:.2s_ease] text-white [background:rgba(255,255,255,.06)] motion-reduce:[transition:none]!",
  };
  const classes = `${variants[variant]} ${className}`.trim();

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
