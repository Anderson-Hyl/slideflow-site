import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

const sizes = {
  sm:  "px-4 py-2 text-sm",
  md:  "px-5 py-2.5 text-sm",
  lg:  "px-7 py-3.5 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-semibold rounded-btn transition-all duration-200 whitespace-nowrap";

  const variants = {
    primary: "",
    ghost:
      "bg-transparent border border-border text-text-secondary hover:border-brand-blue/40 hover:text-text-primary",
    outline:
      "bg-transparent border border-brand-blue/30 text-brand-blue hover:bg-brand-blue/8",
  };

  const combinedClass = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return variant === "primary" ? (
      <a
        href={href}
        className={combinedClass}
        style={{
          background:
            "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
          color: "white",
        }}
      >
        {children}
      </a>
    ) : (
      <a href={href} className={combinedClass}>
        {children}
      </a>
    );
  }

  return variant === "primary" ? (
    <button
      className={combinedClass}
      style={{
        background:
          "linear-gradient(135deg, #2D5AB3 0%, #4C81DD 30%, #5C8FE6 60%, #7AA5FA 100%)",
        color: "white",
      }}
    >
      {children}
    </button>
  ) : (
    <button className={combinedClass}>{children}</button>
  );
}
