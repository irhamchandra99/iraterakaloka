import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "gold" | "outline-light";

const variants: Record<Variant, { button: string; arrow: string }> = {
  primary: {
    button:
      "bg-maroon text-cream hover:bg-maroon-deep focus-visible:outline-maroon",
    arrow: "bg-gold text-maroon",
  },
  secondary: {
    button:
      "border-2 border-maroon text-maroon hover:bg-maroon/5 focus-visible:outline-maroon",
    arrow: "bg-maroon text-cream",
  },
  gold: {
    button: "bg-gold text-maroon hover:bg-cream focus-visible:outline-gold",
    arrow: "bg-maroon text-gold",
  },
  "outline-light": {
    button:
      "border-2 border-cream/70 text-cream hover:bg-cream hover:text-maroon focus-visible:outline-gold",
    arrow: "bg-cream text-maroon",
  },
};

/**
 * Link button whose arrow slides right on hover/focus (CSS only).
 * Two stacked arrows: one exits right while the other enters from the left.
 */
export default function ArrowButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const style = variants[variant];
  const arrowMotion =
    "absolute transition-transform duration-300 ease-out motion-reduce:transition-none";

  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full py-2 pl-6 pr-2 text-base font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 ${style.button} ${className}`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ${style.arrow}`}
      >
        <ArrowRight
          size={18}
          className={`${arrowMotion} group-hover:translate-x-[180%] group-focus-visible:translate-x-[180%]`}
        />
        <ArrowRight
          size={18}
          className={`${arrowMotion} -translate-x-[180%] group-hover:translate-x-0 group-focus-visible:translate-x-0`}
        />
      </span>
    </Link>
  );
}
