type TechieCharacterProps = {
  label?: string;
  compact?: boolean;
};

export function TechieCharacter({ label = "build()", compact = false }: TechieCharacterProps) {
  return (
    <div className={`techie ${compact ? "techie--compact" : ""}`} aria-hidden="true">
      <div className="techie__antenna"><span /></div>
      <div className="techie__head">
        <span className="techie__eye techie__eye--left" />
        <span className="techie__eye techie__eye--right" />
        <span className="techie__mouth" />
      </div>
      <div className="techie__body">
        <span className="techie__screen">{label}</span>
      </div>
      <span className="techie__arm techie__arm--left" />
      <span className="techie__arm techie__arm--right" />
    </div>
  );
}
