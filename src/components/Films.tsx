// "use client";

// export default function Films() {
//   return (
//     <section className="films-root">
//       <div className="films-container">
//         <h2 className="films-title">Films</h2>

//         <div className="films-video-wrapper">
//           <div className="films-video-embed">
//             <iframe
//               src="https://www.youtube.com/embed/dMNc1nwq-UM"
//               title="CandidKlix Film"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>

//         <div className="films-actions">
//           <a
//             href="https://www.youtube.com/@pradeepkpottumuthu9895"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="films-btn"
//           >
//             View All
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

//Working code

"use client";

export default function Films(): JSX.Element {
  return (
    <section className="films-root">
      <div className="films-container">
        <h2 className="films-title">Films</h2>

        <div className="films-video-wrapper">
          <div className="films-video-embed">
            <iframe
              src="https://www.youtube.com/embed/dMNc1nwq-UM"
              title="CandidKlix Featured Film"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ border: 0 }}
            />
          </div>
        </div>

        <div className="films-actions">
          <a
            href="https://www.youtube.com/@pradeepkpottumuthu9895"
            target="_blank"
            rel="noopener noreferrer"
            className="films-btn"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  );
}