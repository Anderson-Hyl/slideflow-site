interface GradientOrbProps {
  color?: "blue" | "purple" | "mid";
  size?: number;
  className?: string;
  /** Negative animation-delay (in seconds) so multiple orbs drift out of phase. */
  driftOffset?: number;
}

const colorMap = {
  blue:   { from: "#7AA5FA", to: "#4C81DD" },
  mid:    { from: "#9BB9FA", to: "#7AA5FA" },
  purple: { from: "#B5CFFF", to: "#7AA5FA" },
};

export function GradientOrb({
  color = "blue",
  size = 600,
  className = "",
  driftOffset = 0,
}: GradientOrbProps) {
  const { from, to } = colorMap[color];

  return (
    <div
      aria-hidden="true"
      className={`orb-animated absolute pointer-events-none rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${from}28 0%, ${to}14 45%, transparent 70%)`,
        filter: "blur(80px)",
        animationDelay: `${driftOffset}s`,
      }}
    />
  );
}
