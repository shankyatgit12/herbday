import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "./App.css";

import Countdown from "./components/Countdown";
import CelebrationPage from "./components/CelebrationPage";
import MessageCard from "./components/MessageCard";
import Gallery from "./components/Gallery";
import MusicPlayer from "./components/MusicPlayer";
import Hearts from "./components/Hearts";
import Effects from "./components/Effects";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);
  const page4Ref = useRef(null);
  const musicPlayerRef = useRef(null);

  useEffect(() => {
    // show first page on load
    gsap.set(page1Ref.current, { autoAlpha: 1, x: 0 });
  }, []);

  const goToPage = (next) => {
    if (next === currentPage) return;

    const pages = {
      1: page1Ref,
      2: page2Ref,
      3: page3Ref,
      4: page4Ref,
    };

    const current = pages[currentPage].current;
    const target = pages[next].current;

    gsap.to(current, {
      x: -50,
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.set(target, { x: 50, autoAlpha: 0, display: "flex" });

    gsap.to(target, {
      x: 0,
      autoAlpha: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    setCurrentPage(next);
  };

  return (
    <div className="app">
      <MusicPlayer ref={musicPlayerRef} />
      <Hearts />
      <Effects />

      {/* PAGE 1 */}
      <div ref={page1Ref} className="page">
        <h1>
          Happy Birthday <span className="highlight">Rashi Baby</span> 🎂
        </h1>
        <p>The day the most beautiful soul was born 💖</p>

        <Countdown />

        <button className="celebrate-btn" onClick={() => goToPage(2)}>
          🎀 Let’s Celebrate You
        </button>
      </div>

      {/* PAGE 2 */}
      <div ref={page2Ref} className="page hidden">
        <CelebrationPage
          musicPlayerRef={musicPlayerRef}
          onComplete={() => goToPage(3)}
        />
      </div>

      {/* PAGE 3 */}
      <div ref={page3Ref} className="page hidden">
        <button className="back-btn" onClick={() => goToPage(2)}>
          ← Back
        </button>

        <MessageCard />

        <button className="page-nav-btn" onClick={() => goToPage(4)}>
          📸 Our Memories
        </button>
      </div>

      {/* PAGE 4 */}
      <div ref={page4Ref} className="page hidden">
        <button className="back-btn" onClick={() => goToPage(3)}>
          ← Back
        </button>

        <Gallery />

        <h2 className="final-message">💖 Forever yours, Rashi Baby 💖</h2>
        <p className="final-subtitle">— Shashank</p>
      </div>
    </div>
  );
}

export default App;
