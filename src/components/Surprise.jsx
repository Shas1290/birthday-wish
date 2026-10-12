import React, { useState, useEffect, useRef } from 'react';
import config from '../config.js';
import './Surprise.css';

/**
 * Surprise Section Component
 * 
 * Interactive 3D gift box with unwrap sequence, confetti burst,
 * ambient sparkles, and a luxury reveal card.
 */
export default function Surprise() {
  // Animation states: 'idle' | 'opening' | 'confetti' | 'box-fading' | 'revealed'
  const [animationStage, setAnimationStage] = useState('idle');
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [ambientSparkles, setAmbientSparkles] = useState([]);
  const timeoutRefs = useRef([]);

  const isOpened = animationStage !== 'idle';
  const isLidOpen = animationStage !== 'idle';
  const isBoxHidden = animationStage === 'box-fading' || animationStage === 'revealed';
  const isRevealed = animationStage === 'revealed';

  // Generate ambient floating sparkles on mount
  useEffect(() => {
    const sparkles = Array.from({ length: 18 }, (_, index) => ({
      id: index,
      top: `${Math.random() * 85 + 5}%`,
      left: `${Math.random() * 90 + 5}%`,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 3 + 2.5,
      delay: Math.random() * 4,
    }));
    setAmbientSparkles(sparkles);

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  // Handle gift box unwrap click
  const handleUnwrap = () => {
    if (animationStage !== 'idle') return;

    // 1. Stage: opening (Lid rotates back immediately)
    setAnimationStage('opening');

    // 2. After 500ms: Confetti burst
    const confettiTimer = setTimeout(() => {
      generateConfetti();
      setAnimationStage('confetti');
    }, 500);

    // 3. After 800ms: Box starts fading away
    const boxFadeTimer = setTimeout(() => {
      setAnimationStage('box-fading');
    }, 800);

    // 4. After 1000ms: Reveal card fades & scales in
    const revealTimer = setTimeout(() => {
      setAnimationStage('revealed');
    }, 1000);

    timeoutRefs.current = [confettiTimer, boxFadeTimer, revealTimer];
  };

  // Re-wrap function so the user can experience the delight again
  const handleRewrap = () => {
    timeoutRefs.current.forEach(clearTimeout);
    setConfettiPieces([]);
    setAnimationStage('idle');
  };

  // Generate dynamic confetti pieces
  const generateConfetti = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
    const count = isMobile ? 40 : 70;
    const colors = config?.colors?.confetti || [
      '#FF6B9D',
      '#FFD1DC',
      '#C9A96E',
      '#FF8FB5',
      '#E0C68F',
      '#FFF0F3',
      '#FFB6C1',
    ];

    const pieces = Array.from({ length: count }, (_, i) => {
      // Random angle in radians and radial distance
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * (isMobile ? 220 : 340) + 60;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - (Math.random() * 80); // upward bias

      const shapes = ['rect', 'circle', 'strip'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const rot = Math.random() * 360;
      const rotEnd = rot + (Math.random() * 720 - 360);
      const delay = Math.random() * 150;
      const duration = Math.random() * 0.8 + 1.4;

      return {
        id: i,
        x: `${x.toFixed(1)}px`,
        y: `${y.toFixed(1)}px`,
        rot: `${rot.toFixed(0)}deg`,
        rotEnd: `${rotEnd.toFixed(0)}deg`,
        color,
        shape,
        delay: `${delay}ms`,
        duration: `${duration.toFixed(2)}s`,
        size: Math.random() * 6 + 7,
      };
    });

    setConfettiPieces(pieces);

    // Clear confetti pieces from DOM after animations finish
    const cleanupTimer = setTimeout(() => {
      setConfettiPieces([]);
    }, 2500);
    timeoutRefs.current.push(cleanupTimer);
  };

  return (
    <section className="surprise-section" id="surprise" aria-label="Birthday Surprise">
      {/* Background Floating Sparkles */}
      <div className="surprise-ambient-sparkles" aria-hidden="true">
        {ambientSparkles.map((sp) => (
          <span
            key={sp.id}
            className="ambient-sparkle"
            style={{
              top: sp.top,
              left: sp.left,
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              animationDuration: `${sp.duration}s`,
              animationDelay: `${sp.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="surprise-container">
        {/* Title before unwrap */}
        <h2 className={`surprise-header-title ${isBoxHidden ? 'hidden' : ''}`}>
          {config?.surprise?.title || 'Ek Aur Cheez Tumhara Intezaar Kar Rahi Hai... 🎁'}
        </h2>

        {/* Gift Stage Area */}
        <div className="surprise-stage">
          {/* Confetti Burst Container */}
          <div className="confetti-container" aria-hidden="true">
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className={`confetti-particle shape-${piece.shape}`}
                style={{
                  '--tx': piece.x,
                  '--ty': piece.y,
                  '--rot-start': piece.rot,
                  '--rot-end': piece.rotEnd,
                  '--color': piece.color,
                  '--duration': piece.duration,
                  animationDelay: piece.delay,
                  width: piece.shape === 'strip' ? `${piece.size * 0.4}px` : `${piece.size}px`,
                  height: piece.shape === 'strip' ? `${piece.size * 1.6}px` : `${piece.size}px`,
                  backgroundColor: piece.color,
                }}
              />
            ))}
          </div>

          {/* 3D Gift Box Component */}
          {!isBoxHidden && (
            <div
              className={`gift-box-wrapper ${isOpened ? 'opened' : 'idle-bounce'} ${
                animationStage === 'box-fading' ? 'box-fading' : ''
              }`}
              onClick={!isOpened ? handleUnwrap : undefined}
              role="button"
              tabIndex={isOpened ? -1 : 0}
              onKeyDown={(e) => {
                if (!isOpened && (e.key === 'Enter' || e.key === ' ')) {
                  handleUnwrap();
                }
              }}
              aria-label="Interactive Gift Box. Click or press Enter to unwrap."
            >
              {/* Box Lid & Bow */}
              <div className={`gift-lid ${isLidOpen ? 'lid-open' : ''}`}>
                {/* Bow on top of the lid */}
                <div className="gift-bow">
                  <div className="bow-loop bow-left" />
                  <div className="bow-knot" />
                  <div className="bow-loop bow-right" />
                  <div className="bow-ribbon-tail tail-left" />
                  <div className="bow-ribbon-tail tail-right" />
                </div>
                {/* Lid horizontal & vertical ribbon */}
                <div className="lid-body">
                  <div className="ribbon-vertical lid-ribbon-v" />
                  <div className="ribbon-horizontal lid-ribbon-h" />
                </div>
              </div>

              {/* Gift Box Base */}
              <div className="gift-body">
                <div className="ribbon-vertical body-ribbon-v" />
                <div className="ribbon-horizontal body-ribbon-h" />
                <div className="gift-shadow-overlay" />
              </div>

              {/* Subtle ground shadow */}
              <div className="gift-ground-shadow" />
            </div>
          )}

          {/* Unwrap Trigger Button (Before unwrap) */}
          {!isOpened && (
            <div className="surprise-button-wrapper">
              <button
                type="button"
                className="surprise-unwrap-btn"
                onClick={handleUnwrap}
              >
                <span className="btn-sparkle-icon" aria-hidden="true">✨</span>
                <span>{config?.surprise?.buttonText || 'Apna Surprise Unwrap Karo 🎁'}</span>
                <span className="btn-sparkle-icon" aria-hidden="true">✨</span>
              </button>
            </div>
          )}

          {/* Reveal Card (After unwrap) */}
          {isRevealed && (
            <div className="reveal-card-wrapper animate-reveal">
              {/* Floating magical sparkles around the card */}
              <div className="card-sparkles" aria-hidden="true">
                <span className="card-sparkle sp-1">✨</span>
                <span className="card-sparkle sp-2">💖</span>
                <span className="card-sparkle sp-3">✨</span>
                <span className="card-sparkle sp-4">🌸</span>
                <span className="card-sparkle sp-5">✨</span>
              </div>

              <div className="reveal-card">
                <div className="reveal-card-glow" />
                
                {/* Top ribbon ornament */}
                <div className="card-ornament">
                  <span className="ornament-heart">💝</span>
                </div>

                <h3 className="reveal-title">
                  {config?.surprise?.revealTitle || 'Sirf Tumhare Liye... 💝'}
                </h3>

                <div className="reveal-divider">
                  <span className="divider-line" />
                  <span className="divider-gem">✨</span>
                  <span className="divider-line" />
                </div>

                <p className="reveal-message">
                  {config?.surprise?.revealMessage ||
                    'Tum meri duniya ho. Har subah tumhari wajah se khoobsurat hoti hai, aur har raat tumhare khayal mein guzarti hai. I promise to make every day as special as you make mine. Happy Birthday, my love! 💕🌹'}
                </p>

                <div className="reveal-footer">
                  <button
                    type="button"
                    className="rewrap-btn"
                    onClick={handleRewrap}
                    title="Wrap the gift again"
                  >
                    <span>🎁 Dobara Dekho</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
