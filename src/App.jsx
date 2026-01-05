import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRef, useState, useEffect } from "react";
import "./App.css";

import CelebrationPage from "./components/CelebrationPage";
import Countdown from "./components/Countdown";
import Effects from "./components/Effects";
import Gallery from "./components/Gallery";
import Hearts from "./components/Hearts";
import MessageCard from "./components/MessageCard";
import MusicPlayer from "./components/MusicPlayer";

gsap.registerPlugin(ScrollToPlugin);

function App() {
  // ✅ START AT PAGE 0 (IMPORTANT)
  const [currentPage, setCurrentPage] = useState(0);
  const [showEffects] = useState(true);

  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);
  const page4Ref = useRef(null);
  const musicPlayerRef = useRef(null);

  const refs = {
    0: page1Ref,
    1: page2Ref,
    2: page3Ref,
    3: page4Ref,
  };

  // ✅ ENSURE FIRST PAGE IS VISIBLE ON LOAD
  useEffect(() => {
    Object.values(refs).forEach((ref, index) => {
      if (ref.current) {
        ref.current.style.visibility = index === 0 ? "visible" : "hidden";
      }
    });
  }, []);

  const goToPage = (nextPage) => {
    if (nextPage === currentPage) return;

    const currentRef = refs[currentPage].current;
    const nextRef = refs[nextPage].current;
    const isForward = nextPage > currentPage;

    gsap.to(currentRef, {
      x: isForward ? "-100%" : "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    gsap.set(nextRef, {
      x: isForward ? "100%" : "-100%",
      opacity: 0,
      visibility: "visible",
    });

    gsap.to(nextRef, {
      x: "0%",
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        currentRef.style.visibility = "hidden";
        setCurrentPage(nextPage);
        gsap.to(window, { scrollTo: 0, duration: 0.2 });
      },
    });
  };

  return (
    <div className="app">
      <MusicPlayer ref={musicPlayerRef} />
      <Hearts />

      {/* PAGE 1 */}
      <div ref={page1Ref} className="page">
        <section className="hero">
          <h1>
            Happy Birthday <span className="highlight">Rashi Baby</span> 🎂
          </h1>
          <p>
            Today isn’t just another day.  
            It’s the day the most beautiful soul was born 💖
          </p>
        </section>

        {/* ❌ Countdown NO AUTO NAVIGATION */}
        <Countdown birthdayReached={true} />

        <section className="teaser">
          <h2>💖 This is just for you 💖</h2>
          <p>A small reminder of how special you are ✨</p>
        </section>

        <button className="celebrate-btn" onClick={() => goToPage(1)}>
          🎀 Let’s Celebrate You
        </button>
      </div>

      {/* PAGE 2 */}
      <div ref={page2Ref} className="page">
        <CelebrationPage
          onComplete={() => goToPage(2)}
          musicPlayerRef={musicPlayerRef}
        />
      </div>

      {/* PAGE 3 */}
      <div ref={page3Ref} className="page">
        <button className="back-btn" onClick={() => goToPage(1)}>← Back</button>
        <MessageCard isActive={currentPage === 2} />
        <button className="page-nav-btn" onClick={() => goToPage(3)}>
          📸 Our Memories
        </button>
      </div>

      {/* PAGE 4 */}
      <div ref={page4Ref} className="page">
        <button className="back-btn" onClick={() => goToPage(2)}>← Back</button>
        <Gallery isActive={currentPage === 3} />
        <section className="final">
          <h2>💖 Forever yours, Rashi Baby 💖</h2>
          <p>Always here — <strong>Shashank</strong></p>
        </section>
      </div>

      {showEffects && <Effects />}
    </div>
  );
}

export default App;
