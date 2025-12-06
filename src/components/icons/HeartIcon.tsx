import React from "react";
export default function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20s-7-4.5-9-7.2C-0.3 8.9 4.8 4 8.7 6.2 10.6 7.4 12 9 12 9s1.4-1.6 3.3-2.8C19.2 4 24.3 8.9 21 12.8 19 15.5 12 20 12 20z"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
