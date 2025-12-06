import React from "react";
import Link from "next/link";

export default function Button({
  children,
  href,
  variant = "primary", // primary | outline | pill
  size = "md", // sm | md | lg
  className = "",
  ...props
}) {
  const sizeMap = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  const variants = {
    primary:
      "bg-candid-primary text-gray-900 hover:bg-[#e0b0b8] shadow-soft rounded-xl",
    outline:
      "bg-white border border-candid-primary text-gray-900 hover:bg-[#fffaf9] shadow-sm rounded-xl",
    pill:
      "bg-candid-primary text-gray-900 hover:bg-[#e0b0b8] shadow-soft rounded-full",
  };

  const classes = `inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-candid-accent ${sizeMap[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={typeof children === "string" ? children : "button"}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
