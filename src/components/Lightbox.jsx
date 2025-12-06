"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Lightbox({ files = [], index = null, onClose, onPrev, onNext }) {
  if (index === null) return null;
  if (typeof document === "undefined") return null;

  const file = files[index];
  if (!file) return null;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const portalRoot = document.body;

  const wrapper = {
    position: "fixed",
    inset: 0,
    zIndex: 1200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    background: "rgba(6,6,6,0.65)",
  };
  const container = {
    position: "relative",
    width: "min(1200px, 96vw)",
    height: "min(820px, 88vh)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const btn = {
    position: "absolute",
    right: 12,
    top: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    zIndex: 3,
  };
  const arrow = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 48,
    height: 48,
    borderRadius: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    zIndex: 3,
    fontSize: 28,
  };

  const mediaStyle = {
    width: "100%",
    maxHeight: "75vh",
    objectFit: "contain",
    background: "#000",
    display: "block",
  };

  return createPortal(
    <div style={wrapper} role="dialog" aria-modal="true">
      <div
        style={{ position: "absolute", inset: 0 }}
        onClick={onClose}
        aria-hidden
      />
      <div style={container}>
        <button aria-label="close" onClick={onClose} style={btn}>
          ×
        </button>
        <button aria-label="prev" onClick={onPrev} style={{ ...arrow, left: 12 }}>
          ‹
        </button>
        <button aria-label="next" onClick={onNext} style={{ ...arrow, right: 12 }}>
          ›
        </button>

        <div style={{ background: "#0b0b0b", borderRadius: 10, overflow: "hidden", width: "100%", height: "100%" }}>
          {file.mimeType?.startsWith("image/") ? (
            <img src={`/api/drive/media/${file.id}`} alt={file.name || ""} style={mediaStyle} />
          ) : (
            <video controls src={`/api/drive/media/${file.id}`} style={mediaStyle} />
          )}

          <div style={{ padding: 12, textAlign: "center", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 13 }}>
            {file.name}
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  );
}
