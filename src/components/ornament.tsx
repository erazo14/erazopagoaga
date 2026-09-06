type OrnamentProps = {
  className?: string;
  label?: string;
};

export function Ornament({ className = '', label = 'A and M' }: OrnamentProps) {
  return (
    <div className={`flex items-center justify-center gap-3 text-accent ${className}`} aria-label={label}>
      <span className="h-px w-12 bg-current opacity-60" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      <span className="h-px w-12 bg-current opacity-60" />
    </div>
  );
}