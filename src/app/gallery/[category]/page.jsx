// "use client";

// import React, {
//   useEffect,
//   useState,
//   useCallback,
//   useRef,
//   useMemo,
// } from "react";

// /**
//  * Category gallery page with lightweight lightbox.
//  * - Expects /api/gallery/[category] to return { category, files: [{ id, name, mimeType, thumbnailLink? }] }
//  * - Works without changing backend; builds Drive URLs from file.id
//  */
// export default function CategoryPage(props) {
//   // Unwrap params Promise (Next 16 dynamic API)
//   const resolved = React.use(props.params);
//   const { category } = resolved || {};

//   const [title, setTitle] = useState("");
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const mountedRef = useRef(true);

//   // Lightbox state
//   const [isOpen, setIsOpen] = useState(false);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     mountedRef.current = true;
//     return () => {
//       mountedRef.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (!category) return;
//     setLoading(true);
//     (async () => {
//       try {
//         const res = await fetch(`/api/gallery/${category}`);
//         const data = await res.json();
//         if (!mountedRef.current) return;
//         setTitle(data?.category || category);
//         setFiles(Array.isArray(data?.files) ? data.files : []);
//       } catch (err) {
//         console.error("Failed to fetch gallery:", err);
//         setFiles([]);
//       } finally {
//         if (mountedRef.current) setLoading(false);
//       }
//     })();
//   }, [category]);

//   // Build Drive URLs
//   const getThumbUrl = (file) => {
//     if (!file?.id) return "";
//     // small/large thumbnails for the grid (thumbnail endpoint)
//     return `https://drive.google.com/thumbnail?id=${file.id}&sz=w1200`;
//   };
//   const getFullUrl = (file) => {
//     if (!file?.id) return "";
//     // full-size view URL (works well for Drive-hosted images)
//     return `https://drive.google.com/uc?export=view&id=${file.id}`;
//   };

//   // Derived list of images for lightbox navigation
//   const imageList = useMemo(
//     () =>
//       files.map((f) => ({
//         id: f.id,
//         name: f.name,
//         thumb: getThumbUrl(f),
//         full: getFullUrl(f),
//       })),
//     [files]
//   );

//   // open lightbox
//   const openAt = useCallback((i) => {
//     setIndex(i);
//     setIsOpen(true);
//     // lock scroll
//     document.body.style.overflow = "hidden";
//   }, []);

//   // close lightbox
//   const close = useCallback(() => {
//     setIsOpen(false);
//     document.body.style.overflow = "";
//   }, []);

//   const next = useCallback(() => {
//     setIndex((p) => (p + 1) % imageList.length);
//   }, [imageList.length]);

//   const prev = useCallback(() => {
//     setIndex((p) => (p - 1 + imageList.length) % imageList.length);
//   }, [imageList.length]);

//   // keyboard handling
//   useEffect(() => {
//     if (!isOpen) return;
//     function onKey(e) {
//       if (e.key === "Escape") close();
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     }
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [isOpen, close, next, prev]);

//   // click outside detection for the large image
//   const overlayRef = useRef(null);
//   const onOverlayClick = (e) => {
//     if (e.target === overlayRef.current) close();
//   };

//   return (
//     <div className="category-root">
//       <div className="category-inner">
//         <header className="category-header">
//           <h1>{title || "Gallery"}</h1>
//           <p>Explore curated memories from our {title || "collection"}.</p>
//         </header>

//         {loading ? (
//           <div className="loading">Loading images…</div>
//         ) : files.length === 0 ? (
//           <div className="empty">No images found in this collection.</div>
//         ) : (
//           <div className="grid">
//             {imageList.map((img, i) => (
//               <article
//                 key={img.id || i}
//                 className="card"
//                 onClick={() => openAt(i)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => (e.key === "Enter" ? openAt(i) : null)}
//               >
//                 <div className="media">
//                   {/* Use <img> directly so SSR works; if broken, fallback background */
//                   img.thumb ? (
//                     <img src={img.thumb} alt={img.name || title} />
//                   ) : (
//                     <div className="placeholder" />
//                   )}
//                 </div>

//                 {/* caption area omitted to avoid long drive filenames */}
//                 <div className="meta">
//                   <span className="meta-title">{/* optional caption */}</span>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* LIGHTBOX */}
//       {isOpen && imageList[index] && (
//         <div
//           className="lightbox-overlay"
//           ref={overlayRef}
//           onMouseDown={onOverlayClick}
//           aria-modal="true"
//           role="dialog"
//         >
//           <div className="lightbox-inner">
//             <button
//               className="lb-close"
//               aria-label="Close"
//               onClick={close}
//             >
//               ✕
//             </button>

//             <button className="lb-nav lb-prev" onClick={prev} aria-label="Previous image">
//               ‹
//             </button>

//             <div className="lb-media">
//               <img
//                 src={imageList[index].full}
//                 alt={imageList[index].name || `Image ${index + 1}`}
//                 onError={(e) => {
//                   // fallback to thumb if full fails
//                   if (imageList[index].thumb) e.target.src = imageList[index].thumb;
//                 }}
//               />
//               <div className="lb-caption">
//                 {imageList[index].name ? <span>{imageList[index].name}</span> : null}
//               </div>
//             </div>

//             <button className="lb-nav lb-next" onClick={next} aria-label="Next image">
//               ›
//             </button>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         :root {
//           --bg: #fbf7f6;
//           --card: #fff;
//           --muted: #7a7a7a;
//           --shadow: rgba(18, 18, 18, 0.06);
//         }
//         .category-root {
//           background: var(--bg);
//           min-height: 100vh;
//           padding: 56px 20px;
//         }
//         .category-inner {
//           max-width: 1200px;
//           margin: 0 auto;
//         }
//         .category-header {
//           text-align: center;
//           margin-bottom: 36px;
//         }
//         .category-header h1 {
//           font-family: var(--font-heading);
//           font-size: 44px;
//           margin: 0;
//           color: #222;
//         }
//         .category-header p {
//           margin-top: 8px;
//           color: var(--muted);
//         }

//         .loading,
//         .empty {
//           text-align: center;
//           padding: 40px 0;
//           color: var(--muted);
//         }

//         .grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//           gap: 26px;
//         }

//         .card {
//           background: var(--card);
//           border-radius: 14px;
//           overflow: hidden;
//           box-shadow: 0 10px 28px var(--shadow);
//           cursor: zoom-in;
//           transition: transform 220ms ease, box-shadow 220ms ease;
//           display: flex;
//           flex-direction: column;
//           min-height: 260px;
//         }
//         .card:focus { outline: 2px solid rgba(0,0,0,0.06); }
//         .card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }

//         .media {
//           height: 200px;
//           width: 100%;
//           background: #f4f4f4;
//           display: block;
//           position: relative;
//         }
//         .media img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           display: block;
//           transition: transform 400ms ease;
//         }
//         .card:hover .media img {
//           transform: scale(1.03);
//         }

//         .meta {
//           padding: 16px;
//           text-align: center;
//           background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(255,255,255,1));
//         }
//         .meta-title {
//           color: var(--muted);
//           font-size: 14px;
//           display: block;
//         }

//         /* Lightbox */
//         .lightbox-overlay {
//           position: fixed;
//           inset: 0;
//           z-index: 1200;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: rgba(6, 6, 6, 0.64);
//           padding: 28px;
//         }
//         .lightbox-inner {
//           position: relative;
//           width: min(1200px, 96vw);
//           height: min(820px, 88vh);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .lb-media {
//           width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #0f0f0f;
//           border-radius: 10px;
//           overflow: hidden;
//           position: relative;
//         }

//         .lb-media img {
//           max-width: 100%;
//           max-height: 100%;
//           object-fit: contain;
//           display: block;
//         }

//         .lb-caption {
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           padding: 12px 18px;
//           background: linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.45));
//           color: #fff;
//           font-size: 14px;
//           text-align: center;
//         }

//         .lb-close {
//           position: absolute;
//           top: -8px;
//           right: -8px;
//           background: #fff;
//           width: 40px;
//           height: 40px;
//           border-radius: 999px;
//           border: none;
//           font-size: 18px;
//           cursor: pointer;
//           box-shadow: 0 6px 18px rgba(0,0,0,0.3);
//         }

//         .lb-nav {
//           position: absolute;
//           top: 50%;
//           transform: translateY(-50%);
//           width: 58px;
//           height: 58px;
//           background: rgba(255,255,255,0.06);
//           border: none;
//           color: #fff;
//           font-size: 34px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           border-radius: 999px;
//           backdrop-filter: blur(4px);
//         }
//         .lb-prev { left: -28px; }
//         .lb-next { right: -28px; }

//         @media (max-width: 880px) {
//           .lightbox-inner { height: 84vh; }
//           .lb-prev, .lb-next { width: 46px; height: 46px; font-size: 28px; left: 6px; right: 6px; }
//           .lb-prev { left: 6px; }
//           .lb-next { right: 6px; }
//         }

//         @media (max-width: 520px) {
//           .media { height: 160px; }
//           .card { min-height: 200px; }
//           .lightbox-inner { padding: 12px; width: 98vw; height: 78vh; }
//           .lb-nav { display: none; }
//         }
//       `}</style>
//     </div>
//   );
// }




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
