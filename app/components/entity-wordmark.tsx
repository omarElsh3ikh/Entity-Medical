type EntityWordmarkProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export function EntityWordmark({ className = '', variant = 'dark' }: EntityWordmarkProps) {
  const src = variant === 'light' ? '/brand/entity-wordmark-white.png' : '/brand/entity-wordmark.png';
  return (
    <span className={`entity-wordmark ${className}`.trim()} aria-label="ENTITY">
      <img
        src={src}
        alt="ENTITY"
        width={742}
        height={120}
        className="entity-wordmark-img"
        loading="eager"
      />
    </span>
  );
}
