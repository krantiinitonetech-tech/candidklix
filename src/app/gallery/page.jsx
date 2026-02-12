"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GalleryCollections from "@/components/GalleryCollections";


// export const metadata = {
//   title: "Gallery — CandidKlix",
// };

export default function GalleryPage() {
  return (
    <main>

      <GalleryCollections />
    </main>
  );
}

