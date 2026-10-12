import React, { useEffect, useRef, useState } from 'react';
import config from '../config.js';
import './Cake.css';

export default function Cake() {
  const [wished, setWished] = useState(false);
  const [showWisps, setShowWisps] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const smokeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (smokeTimerRef.current) {
        clearTimeout(smokeTimerRef.current);
      }
    };
  }, []);

  const handleMakeWish = () => {
    if (wished) return;
    setWished(true);
    setShowWisps(true);
    setShowSparkles(true);

    // Turn off smoke wisps after animation finishes
    smokeTimerRef.current = setTimeout(() => {
      setShowWisps(false);
    }, 2200);
  };

  const candleData = [
    { id: 1, type: 'pink', delay: '0s', smokeDelay: '0.1s' },
    { id: 2, type: 'gold', delay: '0.2s', smokeDelay: '0.25s' },
    { id: 3, type: 'pink', delay: '0.4s', smokeDelay: '0.05s' },
    { id: 4, type: 'gold', delay: '0.15s', smokeDelay: '0.2s' },
    { id: 5, type: 'pink', delay: '0.3s', smokeDelay: '0.15s' },
  ];

  // Confetti particles for burst
  const confettiParticles = Array.from({ length: 30 }, (_, index) => {
    const angle = (index / 30) * 360;
    const distance = 80 + (index % 5) * 25;
    const color = config.colors.confetti[index % config.colors.confetti.length];
    const size = 6 + (index % 4) * 2;
    const shape = index % 3 === 0 ? 'circle' : index % 3 === 1 ? 'rect' : 'star';
    const angleRad = (angle * Math.PI) / 180;
    const tx = Math.cos(angleRad) * distance;
    const ty = Math.sin(angleRad) * distance;
    return {
      id: index,
      tx,
      ty,
      color,
      size,
      shape,
      delay: (index % 6) * 0.05,
    };
  });

  return (
    <section className="cake-section" id="cake-section">
      <div className="cake-container">
        <header className="cake-header">
          <h2 className="cake-title">{config.cake.title}</h2>
          <p className="cake-subtitle">{config.cake.subtitle}</p>
        </header>

        {/* Cake display area */}
        <div className="cake-stage">
          {/* Confetti & Sparkle Burst */}
          {showSparkles && (
            <div className="cake-confetti-burst" aria-hidden="true">
              {confettiParticles.map((p) => (
                <span
                  key={p.id}
                  className={`burst-particle particle-${p.shape}`}
                  style={{
                    '--tx': `${p.tx}px`,
                    '--ty': `${p.ty}px`,
                    '--color': p.color,
                    '--size': `${p.size}px`,
                    '--delay': `${p.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="cake-wrapper" role="img" aria-label="Birthday cake with 5 candles">
            {/* Candles mounted on the top tier */}
            <div className="cake-candles-row">
              {candleData.map((candle) => (
                <div key={candle.id} className={`candle candle-${candle.type}`}>
                  {/* Candle Wick */}
                  <div className="candle-wick" />

                  {/* Flame */}
                  <div
                    className={`candle-flame ${wished ? 'extinguished' : ''}`}
                    style={{ animationDelay: candle.delay }}
                  />

                  {/* Smoke Wisp after flame goes out */}
                  {showWisps && (
                    <div
                      className="smoke-wisp"
                      style={{ animationDelay: candle.smokeDelay }}
                    >
                      <span className="smoke-puff smoke-puff-1" />
                      <span className="smoke-puff smoke-puff-2" />
                      <span className="smoke-puff smoke-puff-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Cake Structure */}
            <div className="cake-body">
              {/* Top Tier (Smallest) */}
              <div className="cake-tier tier-top">
                <div className="frosting-top frosting-top-tier" />
                <div className="frosting-drips">
                  <span className="drip drip-1" />
                  <span className="drip drip-2" />
                  <span className="drip drip-3" />
                  <span className="drip drip-4" />
                </div>
                <div className="tier-sprinkles">
                  <span className="sprinkle sp-1" />
                  <span className="sprinkle sp-2" />
                  <span className="sprinkle sp-3" />
                  <span className="sprinkle sp-4" />
                </div>
              </div>

              {/* Middle Tier */}
              <div className="cake-tier tier-middle">
                <div className="frosting-top frosting-middle-tier" />
                <div className="frosting-drips">
                  <span className="drip drip-1" />
                  <span className="drip drip-2" />
                  <span className="drip drip-3" />
                  <span className="drip drip-4" />
                  <span className="drip drip-5" />
                </div>
                <div className="tier-sprinkles">
                  <span className="sprinkle sp-1" />
                  <span className="sprinkle sp-2" />
                  <span className="sprinkle sp-3" />
                  <span className="sprinkle sp-4" />
                  <span className="sprinkle sp-5" />
                </div>
              </div>

              {/* Bottom Tier (Largest) */}
              <div className="cake-tier tier-bottom">
                <div className="frosting-top frosting-bottom-tier" />
                <div className="frosting-drips">
                  <span className="drip drip-1" />
                  <span className="drip drip-2" />
                  <span className="drip drip-3" />
                  <span className="drip drip-4" />
                  <span className="drip drip-5" />
                  <span className="drip drip-6" />
                </div>
                <div className="tier-sprinkles">
                  <span className="sprinkle sp-1" />
                  <span className="sprinkle sp-2" />
                  <span className="sprinkle sp-3" />
                  <span className="sprinkle sp-4" />
                  <span className="sprinkle sp-5" />
                  <span className="sprinkle sp-6" />
                </div>
              </div>
            </div>

            {/* Cake Plate & Base */}
            <div className="cake-plate" />
            <div className="cake-plate-shadow" />
          </div>
        </div>

        {/* Action Button */}
        <div className="cake-actions">
          <button
            type="button"
            className={`cake-button ${wished ? 'wished' : ''}`}
            onClick={handleMakeWish}
            disabled={wished}
            aria-pressed={wished}
          >
            {wished ? 'Wish Made! ✨' : config.cake.buttonText}
          </button>
        </div>

        {/* After-Wish Reveal Message */}
        {wished && (
          <div className="cake-after-message" role="status" aria-live="polite">
            <span className="sparkle-icon left-sparkle" aria-hidden="true">✨</span>
            <p className="after-wish-text">{config.cake.afterWishMessage}</p>
            <span className="sparkle-icon right-sparkle" aria-hidden="true">💫</span>
          </div>
        )}
      </div>
    </section>
  );
}
