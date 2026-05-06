interface SlideFlowLogoProps {
  size?: number;
  className?: string;
}

export function SlideFlowLogo({ size = 32, className = "" }: SlideFlowLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/app-icon.png"
      alt="SlideFlow"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.225,
      }}
    />
  );
}
