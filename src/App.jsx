import { useState, useCallback } from 'react';
import './App.css';
import config from './config.js';
import { confettiBurst } from './utils/confetti.js';

import Landing from './components/Landing.jsx';
import Celebration from './components/Celebration.jsx';
import PersonalMessage from './components/PersonalMessage.jsx';
import Surprise from './components/Surprise.jsx';
import Cake from './components/Cake.jsx';
import Finale from './components/Finale.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';

export default function App() {
  const [started, setStarted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleStart = useCallback(() => {
    setTransitioning(true);

    // Confetti burst on transition
    setTimeout(() => {
      confettiBurst({
        colors: config.colors.confetti,
        count: 100,
        spread: 500,
        originY: 0.4,
      });
    }, 300);

    // Show main content after transition
    setTimeout(() => {
      setStarted(true);
      setTransitioning(false);
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 1400);
  }, []);

  const handleReplay = useCallback(() => {
    setStarted(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Show landing page
  if (!started) {
    return (
      <div className="app">
        <Landing onStart={handleStart} />
        {transitioning && (
          <div className="transition-overlay">
            <span className="heart-burst" aria-hidden="true">💕</span>
          </div>
        )}
      </div>
    );
  }

  // Show main birthday experience
  return (
    <div className="app">
      <div className="app-content">
        <Celebration />
        <hr className="section-divider" />
        <PersonalMessage />
        <hr className="section-divider" />
        <Surprise />
        <hr className="section-divider" />
        <Cake />
        <hr className="section-divider" />
        <Finale onReplay={handleReplay} />
      </div>
      <MusicPlayer />
    </div>
  );
}
