interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "brand" | "green" | "subtle";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default:
      "bg-bg-subtle border border-border text-text-secondary",
    brand:
      "bg-brand-blue/10 border border-brand-blue/20 text-brand-blue",
    green:
      "bg-green-500/10 border border-green-500/20 text-green-400",
    subtle:
      "bg-bg-card border border-border-subtle text-text-muted",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
