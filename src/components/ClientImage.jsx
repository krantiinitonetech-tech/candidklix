// src/components/ClientImage.jsx
"use client";

import React, { useState } from "react";

/**
 * ClientImage - simple client-side <img> with fallback on error.
 * Props:
 *  - src: string (preferred image)
 *  - fallback: string (fallback image)
 *  - alt: string
 *  - className: string
 */
export default function ClientImage({ src, fallback = "/images/about/team.jpg", alt = "", className = "" }) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
