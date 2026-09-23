type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
}: SectionHeadingProps) {
  const alignment = {
    left: "section-heading section-heading--left max-w-[720px] mb-[52px] mobile:mb-[34px]",
    center:
      "section-heading section-heading--center max-w-[720px] mb-[52px] mx-auto text-center mobile:mb-[34px]",
  };

  return (
    <div
      className={`${alignment[align]} ${inverse ? "section-heading--inverse" : ""}`}
    >
      <span className="eyebrow inline-flex items-center gap-[8px] uppercase tracking-[.14em] text-[.75rem] font-bold text-[#547b79] mobile:text-[.68rem] mobile:tracking-[.12em]">
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
