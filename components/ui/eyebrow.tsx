// Section label with a short gold rule.
export default function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.2em] ${
        tone === "light" ? "text-gold" : "text-maroon"
      } ${className}`}
    >
      <span aria-hidden="true" className="h-0.5 w-8 bg-gold" />
      {children}
    </p>
  );
}
