"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createPortal } from "react-dom";

function Lightbox({ files, index, onClose, onPrev, onNext }) {
  if (index === null) return null;
  if (typeof document === "undefined") return null;
  const file = files[index];
  if (!file) return null;

  const portalRoot = document.body;
  const wrapper = { position: "fixed", inset: 0, zIndex: 2147483647, display: "flex", alignItems: "center", justifyContent: "center" };
  const backdrop = { position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)" };
  const container = { position: "relative", zIndex: 2, maxWidth: 1200, width: "100%", margin: "0 16px" };
  const btn = { position: "absolute", right: 12, top: 12, width: 40, height: 40, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.45)", color: "white", border: "none", cursor: "pointer", zIndex: 3 };
  const arrow = { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)", color: "white", border: "none", cursor: "pointer", zIndex: 3 };
  const media = { width: "100%", maxHeight: "75vh", objectFit: "contain", background: "black", display: "block" };

  return createPortal(
    <div style={wrapper} role="dialog" aria-modal="true">
      <div style={backdrop} onClick={onClose} />
      <div style={container}>
        <button aria-label="close" onClick={onClose} style={btn}>×</button>
        <button aria-label="prev" onClick={onPrev} style={{ ...arrow, left: 12 }}>‹</button>
        <button aria-label="next" onClick={onNext} style={{ ...arrow, right: 12 }}>›</button>

        <div style={{ background: "white", borderRadius: 8, overflow: "hidden" }}>
          {file.mimeType?.startsWith("image/") ? (
            <img src={`/api/drive/media/${file.id}`} alt={file.name} style={media} />
          ) : (
            <video controls src={`/api/drive/media/${file.id}`} style={media} />
          )}
          <p style={{ margin: 0, padding: 10, textAlign: "center", background: "#111", color: "white", fontSize: 13 }}>{file.name}</p>
        </div>
      </div>
    </div>,
    portalRoot
  );
}

export default function CategoryGallery() {
  const { category } = useParams();
  const [data, setData] = useState({ files: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  // map: fileId -> true if portrait
  const [portraitMap, setPortraitMap] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/gallery/${category}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
        setError("Failed to load category.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [category]);

  useEffect(() => {
    if (selectedIndex !== null) document.body.classList.add("no-scroll");
    else document.body.classList.remove("no-scroll");
  }, [selectedIndex]);

  useEffect(() => {
    function onKey(e) {
      const visible = (Array.isArray(data.files) ? data.files : []).slice(0, visibleCount);
      if (selectedIndex === null) return;
      if (e.key === "Escape") return setSelectedIndex(null);
      if (e.key === "ArrowRight") return setSelectedIndex(i => (i + 1) % visible.length);
      if (e.key === "ArrowLeft") return setSelectedIndex(i => (i - 1 + visible.length) % visible.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, data.files, visibleCount]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const files = Array.isArray(data.files) ? data.files : [];
  const visibleFiles = files.slice(0, visibleCount);

  const gridStyle = { display: "grid", gridTemplateColumns: "repeat(4, 320px)", gap: "24px", justifyContent: "center" };
  const thumbBox = { width: 320, height: 180, overflow: "hidden", borderRadius: 8, background: "#eee" };
  const thumbImgCover = { width: "100%", height: "100%", objectFit: "cover", display: "block" };
  const thumbImgContain = { width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#111" };

  function handleThumbLoad(e, id) {
    try {
      const { naturalWidth, naturalHeight } = e.target;
      setPortraitMap(prev => {
        if (prev[id] === (naturalHeight > naturalWidth)) return prev;
        return { ...prev, [id]: naturalHeight > naturalWidth };
      });
    } catch (err) {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-8xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-6">{(category || "").toUpperCase()}</h1>

        <div style={gridStyle}>
          {visibleFiles.map((file, idx) => {
            const isPortrait = Boolean(portraitMap[file.id]);
            return (
              <div key={file.id} style={{ width: 320 }} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl">
                <div style={thumbBox}>
                  {file.mimeType?.startsWith("image/") ? (
                    <img
                      src={`/api/drive/media/${file.id}`}
                      alt={file.name}
                      style={isPortrait ? thumbImgContain : thumbImgCover}
                      onLoad={(e) => handleThumbLoad(e, file.id)}
                      onClick={() => setSelectedIndex(idx)}
                      role="button"
                      tabIndex={0}
                      draggable={false}
                    />
                  ) : (
                    <video
                      muted
                      style={thumbImgCover}
                      src={`/api/drive/media/${file.id}`}
                      onLoadedData={(e) => handleThumbLoad(e, file.id)}
                      onClick={() => setSelectedIndex(idx)}
                    />
                  )}
                </div>

                <div style={{ height: 40, padding: "0 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ margin: 0, fontSize: 14, color: "#374151", width: "100%", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {file.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {files.length > visibleCount && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setVisibleCount(v => v + 12)} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Load More</button>
          </div>
        )}
      </div>

      <Lightbox
        files={visibleFiles}
        index={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => setSelectedIndex(i => (i - 1 + visibleFiles.length) % visibleFiles.length)}
        onNext={() => setSelectedIndex(i => (i + 1) % visibleFiles.length)}
      />
    </div>
  );
}
